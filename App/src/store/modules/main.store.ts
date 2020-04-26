import { observable, toJS } from 'mobx';
import { createUserStore, UserStore } from './user.store';
import { createRoomsStore, RoomsStore } from './rooms.store';
import { createThemeStore, ThemeStore } from './theme.store';

export type TStore = {
  user: UserStore;
  rooms: RoomsStore;
  theme: ThemeStore;
};

export interface MainStore extends TGettersStore {
  state: TStore;
}

export type TMethods<T extends any> = {
  [K in keyof Omit<T, 'data'>]: T[K];
};

export type TGetters<T extends any> = {
  [K in keyof T]: T[K]['data'];
};

export interface TGettersStore {
  getters: TGetters<TStore>;
}

export const generateGetterFromStore = (store: TStore): TGettersStore => {
  return {
    getters: Object.entries(store).reduce((prev, current) => {
      const key = current[0] as keyof TStore;
      Object.defineProperty(prev, key, {
        get(): any {
          return toJS(store[key].data);
        },
      });

      return prev;
    }, {} as TGetters<TStore>),
  };
};

export const createStore = (): MainStore => {
  const user = createUserStore();
  const rooms = createRoomsStore();
  const theme = createThemeStore();
  const store = observable({
    user,
    rooms,
    theme,
  });
  const { getters } = generateGetterFromStore(store);

  return {
    state: store,
    getters,
  };
};
