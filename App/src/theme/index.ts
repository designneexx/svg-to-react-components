import { ThemeI, ThemeType } from './interfaces';

export const themeFactory = (themeType: ThemeType): ThemeI => {
  return {
    name: 'designexx',
    primaryColor: themeType === 'DARK' ? '#000' : '#FFF',
    secondaryColor: themeType === 'DARK' ? '#FFF' : '#000',
    type: themeType,
  };
};
