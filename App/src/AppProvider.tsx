import React, { FC } from 'react';
import { ThemeProvider } from 'styled-components';
import { observer } from 'mobx-react-lite';
import { RouterProvider } from './routes/RouterProvider';
import { useGetters } from './store/StoreProvider';

export const AppProvider: FC = observer(() => {
  const { theme } = useGetters();
  console.log(theme);
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider />
    </ThemeProvider>
  );
});
