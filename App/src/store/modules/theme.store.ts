import { observable } from 'mobx';
import { ThemeI } from '../../theme/interfaces';
import { themeFactory } from '../../theme';

type ThemeUpdate = ((theme: ThemeI) => ThemeI) | ThemeI;

export interface ThemeStore {
  data: ThemeI;
  updateTheme(theme: ThemeUpdate): void;
}

export const createThemeStore = () => {
  const store: ThemeStore = observable({
    data: themeFactory('LIGHT'),
    updateTheme(theme: ThemeUpdate): void {
      store.data = typeof theme === 'function' ? theme(store.data) : theme;
    },
  });

  return store;
};
