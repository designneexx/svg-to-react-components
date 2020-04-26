import React, { FC, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { appRoutes } from './index';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { NoMatch } from '../pages/errors/404';
import { ErrorPage } from '../pages/errors/ErrorPage';
import { ErrorStatusT } from '../pages/errors/interfaces';

export const RouterProvider: FC<{ isNestedRoute?: boolean }> = ({ isNestedRoute }) => {
  const [error, setError] = useState<ErrorStatusT>(null);
  const history = useHistory();

  history.listen(() => {
    setError(null);
  });

  return error ? (
    <DefaultLayout>
      <ErrorPage {...error} handlePageError={setError} />
    </DefaultLayout>
  ) : (
    <Switch>
      {appRoutes.map(({ name, path, Component, routes, exact }) => {
        const routeData = (
          <Route key={path} path={path} exact={exact}>
            <Component handlePageError={setError} routes={routes} name={name} />
          </Route>
        );

        return isNestedRoute ? (
          routeData
        ) : (
          <DefaultLayout key={`${path}${name}`}>
            <Route path={path} exact={exact}>
              <Component handlePageError={setError} routes={routes} name={name} />
            </Route>
          </DefaultLayout>
        );
      })}
      <Route path="*">
        <DefaultLayout>
          <NoMatch handlePageError={setError} statusCode={404} message="Страница не найдена" />
        </DefaultLayout>
      </Route>
    </Switch>
  );
};
