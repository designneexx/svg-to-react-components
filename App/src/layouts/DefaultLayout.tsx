import React, { FC } from 'react';
import { Box, Grid, AppBar, Toolbar, Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { appRoutes } from '../routes';
import { useTheme } from '../store/StoreProvider';
import { themeFactory } from '../theme';

export const DefaultLayout: FC = ({ children }) => {
  const { updateTheme } = useTheme();

  const handleToggleTheme = () => {
    updateTheme(({ type }) => {
      return type === 'LIGHT' ? themeFactory('DARK') : themeFactory('LIGHT');
    });
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          {appRoutes.map(({ path, name }) => (
            <NavLink key={path} to={path} activeClassName="active-route">
              {name}
            </NavLink>
          ))}
          <Button onClick={handleToggleTheme}>Переключить тему</Button>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};
