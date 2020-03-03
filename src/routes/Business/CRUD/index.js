import {dynamicWrapper, createRoute} from '../../../utils/core';
import { routerLinks } from "../../constant";

const routesConfig = (app) => ({
  path: routerLinks['BusinessCRUD'],
  title: 'CRUD',
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export default (app) => createRoute(app, routesConfig);
