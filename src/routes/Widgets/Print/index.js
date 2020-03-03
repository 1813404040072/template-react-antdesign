import { dynamicWrapper, createRoute } from '../../../utils/core';
import { routerLinks } from "../../constant";

const routesConfig = app => ({
  path: routerLinks['WidgetsPrint'],
  title: 'Print',
  component: dynamicWrapper(app, [], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
