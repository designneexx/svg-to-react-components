import { RouteI } from './interfaces';
import { HomePage } from '../pages';

export const autoPathRoutes = (route: RouteI, routes: RouteI[]): RouteI[] => {
  return routes.map((currentRoute) => ({
    ...currentRoute,
    path: `${route.path}${currentRoute.path}`,
    routes: autoPathRoutes(
      { ...currentRoute, path: `${route.path}${currentRoute.path}` },
      currentRoute.routes,
    ),
  }));
};

export const generateRoutes = (routes: RouteI[]) => {
  return routes.map((route) => ({
    ...route,
    routes: autoPathRoutes(route, route.routes),
  }));
};

export const appRoutes: RouteI[] = generateRoutes([
  {
    name: 'Главная',
    path: '/',
    exact: true,
    Component: HomePage,
    routes: [],
  },
  {
    name: 'Test',
    path: '/test',
    exact: false,
    Component: () => null,
    routes: [
      {
        name: 'SubTest',
        path: '/1',
        exact: false,
        Component: () => null,
        routes: [
          {
            name: 'DeepTest',
            path: '/2',
            exact: true,
            Component: () => null,
            routes: [],
          },
        ],
      },
    ],
  },
]);
