import React, { Context, createContext, FC, useContext, useMemo } from 'react';
import { useObserver } from 'mobx-react-lite';
import { createStore, MainStore, TGetters, TMethods, TStore } from './modules/main.store';
import { ThemeStore } from './modules/theme.store';

export const StoreContext = createContext<MainStore | null>(null);

export const StoreProvider: FC = ({ children }) => {
  const store = useMemo(() => createStore(), []);

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export const useAllStore = <T extends any>(context: Context<T>) => {
  const value = useContext(context);
  if (!value) {
    throw new Error("Store shouldn't be null");
  }

  return value;
};

export const useStore = <Selection, ContextData, Store>(
  context: Context<ContextData>,
  storeSelector: (contextData: ContextData) => Store,
  dataSelector: (store: Store) => Selection,
) => {
  const value = useAllStore(context);
  const store = storeSelector(value);
  return dataSelector(store);
};

export const useRootData = <Selection extends unknown>(
  dataSelector: (store: MainStore) => Selection,
) => useStore(StoreContext, (contextData) => contextData!, dataSelector);

const getObjectMethods = <T extends object, K extends any>(target: T) => {
  const resultObj = {} as K;

  Object.entries(target).forEach(([key, value]) => {
    const currentKey = key as keyof K;
    if (!Array.isArray(value) && typeof value === 'object' && !Object.is(value, null)) {
      resultObj[currentKey] = {
        ...getObjectMethods(value),
      };
    }
    if (typeof value === 'function') {
      Object.defineProperty(resultObj, key, {
        get() {
          return value;
        },
      });
    }
  });

  return resultObj;
};

export const useStoreDefault = <T extends object>() => {
  return useObserver(() => {
    const store = useRootData((rest) => rest);

    const storeMethods = getObjectMethods<T, TMethods<T>>(store.state as any);
    const storeGetters: TGetters<TStore> = store.getters;

    return {
      ...storeMethods,
      ...storeGetters,
    };
  });
};

export const useTheme = () => {
  return useStoreDefault<ThemeStore>();
};

export const useGetters = () => useRootData(({ getters }) => getters);
