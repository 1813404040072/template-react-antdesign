import { createRoutes } from '../utils/core';
import { routerLinks } from "./constant";
import BasicLayout from '../layouts/BasicLayout';
import UserLayout from '../layouts/UserLayout';
import FrontendLayout from "../layouts/FrontendLayout";

import NotFound from './Pages/404';
import Page403 from './Pages/403';
import Page500 from './Pages/500';
import Login from './Login';
import Register from './Register';

import ScreenLock from './Widgets/ScreenLock';
import Coming from './Widgets/Coming';
import Gallery from './Widgets/Gallery';
import Result from './Widgets/Result';
import LevelRoute from './Widgets/LevelRoute';
import Toolbar from './Widgets/Toolbar';
import BaseComponent from './Widgets/BaseComponent';
import Column from './Widgets/Column';
import TransferTree from './Widgets/TransferTree';
import SearchBar from './Widgets/SearchBar';
import DataTable from './Widgets/DataTable';
import Form from './Widgets/Form';
import EC from './Widgets/Charts/EC';
import Print from './Widgets/Print';
import Banner from './Widgets/Banner';

import Icon from './UI/Icon';
import Mask from './UI/Mask';
import Editor from './UI/Editor';
import CSSAnimate from './UI/CSSAnimate';
import Alerts from './UI/Alerts';
import Button from './UI/Button';

import CRUD from './Business/CRUD';
import Blank from './Blank';
import DropDrag from './DropDrag';
import Home from './Frontend/Home';
import OverviewAudleyToysPage from './OverviewAudleyToysPage';
import PageDashboardHome from './PageDashboardHome';

const routesConfig = app => [
  {
    path: '/:type/administrator/:company',
    title: 'System center',
    component: BasicLayout,
    indexRoute: '/vendor/administrator/pagedashboardhome',
    childRoutes: [
      Icon(),
      Mask(),
      Editor(),
      CSSAnimate(),
      Alerts(),
      Button(),
      Toolbar(app),
      Column(),
      SearchBar(),
      EC(app),
      DataTable(app),
      Form(app),
      TransferTree(app),
      BaseComponent(),
      Coming(),
      ScreenLock(),
      Gallery(),
      Result(),
      Print(),
      Banner(app),
      LevelRoute(app),
      Page403(),
      Page500(),
      CRUD(app),
      Blank(app),
      // 💬 generate admin to here
      PageDashboardHome(app),
      OverviewAudleyToysPage(app),
      DropDrag(app),
    ]
  },
  {
    path: '/:type/',
    title: 'Login',
    indexRoute: '/vendor/login',
    component: UserLayout,
    childRoutes: [
      Login(app),
      Register(app),
      NotFound()
    ]
  },
  {
    path: '/',
    title: 'Login',
    indexRoute: '/vendor/login',
    component: UserLayout,
  },
  // {
  //   path: '/',
  //   title: 'Frontend',
  //   indexRoute: routerLinks['Home'],
  //   component: FrontendLayout,
  //   childRoutes: [
  //     // 💬 generate frontend to here
  //     Home(app),
  //     NotFound(),
  //   ]
  // },
];

export default app => createRoutes(app, routesConfig);
