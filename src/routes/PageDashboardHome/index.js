import { dynamicWrapper, createRoute } from '../../utils/core';
import { routerLinks } from "../constant";

const routesConfig = app => ({
  path: routerLinks['PageDashboardHome'],
  title: 'Audley Toys of NA LLC',
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
