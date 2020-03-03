import { createRoute } from '../../../utils/core';
import { ScreenLock } from '../../../components/Pages';
import { routerLinks } from "../../constant";

const routesConfig = () => ({
  path: routerLinks['WidgetsScreenLock'],
  title: 'Lock screen',
  component: ScreenLock
});

export default app => createRoute(app, routesConfig);
