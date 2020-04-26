import { FC } from 'react';
import { HandleErrorI } from '../pages/errors/interfaces';

export interface PageProps {
  name: string;
  routes: RouteI[];
  handlePageError: HandleErrorI;
}

export interface RouteI {
  name: string;
  path: string;
  exact: boolean;
  Component: FC<PageProps>;
  routes: RouteI[];
}
