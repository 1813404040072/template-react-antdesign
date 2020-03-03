import $$ from 'cmn-utils';

import { routerLinks } from "../routes/constant";
import modelEnhance from '../utils/modelEnhance';
import { DEFAULT_LOCALE } from '../i18n';

export default modelEnhance({
  namespace: 'global',

  state: {
    menu: [],
    flatMenu: [],
    locale: DEFAULT_LOCALE,
  },

  effects: {
    *getMenu({ payload }, { call, put }) {
      // const { status, data } = yield call(getMenu, payload);
      // if (status) {

      // }

      const replaceFunction = matched => payload.typeRouter[matched.substr(1, matched.length)]

      const data = [
        {
          name: 'Audley Toys of NA LLC',
          icon: 'dashboard',
          path: '/:type/administrator/:company',
          children: [
            { name: 'Profile', path: routerLinks['PageDashboardHome'].replace(routerLinks['TypeTwo'], replaceFunction) },
            { name: 'Overview', path: routerLinks['OverviewAudleyToysPage'].replace(routerLinks['TypeTwo'], replaceFunction) },
          ],
        },
        {
          name: 'Component',
          icon: 'desktop',
          path: '/:type/administrator/:company/component',
          children: [
            { name: 'Toolbar', path: routerLinks['WidgetsToolbar'].replace(routerLinks['TypeTwo'], replaceFunction), },
            { name: 'Base Component', path: routerLinks['WidgetsBaseComponent'].replace(routerLinks['TypeTwo'], replaceFunction), },
            { name: 'Columns', path: routerLinks['WidgetsColumns'].replace(routerLinks['TypeTwo'], replaceFunction), },
            { name: 'Search Bar', path: routerLinks['WidgetsSearchBar'].replace(routerLinks['TypeTwo'], replaceFunction), },
            { name: 'Datatable', path: routerLinks['WidgetsDataTable'].replace(routerLinks['TypeTwo'], replaceFunction), },
            { name: 'Form', path: routerLinks['WidgetsForm'].replace(routerLinks['TypeTwo'], replaceFunction), },
            { name: 'Transfer Tree', path: routerLinks['WidgetsTransferTree'].replace(routerLinks['TypeTwo'], replaceFunction), },
            {
              name: 'Charts',
              path: '/:type/administrator/charts',
              children: [
                { name: 'ECharts', path: routerLinks['WidgetsChartsEC'].replace(routerLinks['TypeTwo'], replaceFunction), },
              ]
            },
            { name: 'Print', path: routerLinks['WidgetsPrint'].replace(routerLinks['TypeTwo'], replaceFunction), },
            { name: 'Banner', path: routerLinks['WidgetsBanner'].replace(routerLinks['TypeTwo'], replaceFunction), }
          ],
        },
        {
          name: 'UI Element',
          icon: 'share-alt',
          path: '/:type/administrator/:company/ui',
          children: [
            { name: 'Button', path: routerLinks['UIButton'].replace(routerLinks['TypeTwo'], replaceFunction), },
            { name: 'Alerts', path: routerLinks['UIAlerts'].replace(routerLinks['TypeTwo'], replaceFunction), },
            { name: 'Animations', path: routerLinks['UICSSAnimate'].replace(routerLinks['TypeTwo'], replaceFunction), },
            { name: 'Icons', path: routerLinks['UIIcon'].replace(routerLinks['TypeTwo'], replaceFunction), },
            { name: 'Editor', path: routerLinks['UIEditor'].replace(routerLinks['TypeTwo'], replaceFunction), },
            { name: 'Mask', path: routerLinks['UIMask'].replace(routerLinks['TypeTwo'], replaceFunction), },
          ],
        },
        {
          name: 'Page',
          icon: 'book',
          path: '/:type/administrator/:company/page',
          children: [
            { name: 'Login', path: routerLinks['Login'].replace(routerLinks['TypeTwo'], replaceFunction), },
            { name: 'Register', path: routerLinks['Register'].replace(routerLinks['TypeTwo'], replaceFunction), },
            { name: 'Lock', path: routerLinks['WidgetsScreenLock'].replace(routerLinks['TypeTwo'], replaceFunction), },
            { name: 'Gallery', path: routerLinks['WidgetsGallery'].replace(routerLinks['TypeTwo'], replaceFunction), },
            { name: 'Blank', path: routerLinks['Blank'].replace(routerLinks['TypeTwo'], replaceFunction), },
            { name: 'Result', path: routerLinks['WidgetsResult'].replace(routerLinks['TypeTwo'], replaceFunction), },
            { name: 'Coming Soon', path: routerLinks['WidgetsComing'].replace(routerLinks['TypeTwo'], replaceFunction), },
            { name: '403', path: routerLinks['Pages403'].replace(routerLinks['TypeTwo'], replaceFunction), },
            { name: '404', path: routerLinks['Pages404'].replace(routerLinks['TypeTwo'], replaceFunction), },
            { name: '500', path: routerLinks['Pages500'].replace(routerLinks['TypeTwo'], replaceFunction), },
            { name: 'Multi-level routing', path: routerLinks['WidgetsLevelRoute'].replace(routerLinks['TypeTwo'], replaceFunction), },
            { name: 'Drop Drag', path: routerLinks['DropDrag'].replace(routerLinks['TypeTwo'], replaceFunction), },
          ],
        },
        {
          name: 'General scene',
          icon: 'bulb',
          path: '/:type/administrator/:company/business',
          children: [
            { name: 'CRUD', path: routerLinks['BusinessCRUD'].replace(routerLinks['TypeTwo'], replaceFunction), }
          ],
        },
      ]
      const loopMenu = (menu, pitem = {}) => {
        menu.forEach(item => {
          if (pitem.path) {
            item.parentPath = pitem.parentPath ? pitem.parentPath.concat(pitem.path) : [pitem.path];
          }
          if (item.children && item.children.length) {
            loopMenu(item.children, item);
          }
        });
      };
      loopMenu(data);

      yield put({
        type: 'getMenuSuccess',
        payload: data,
      });
    },
    *setLocale({payload}, {put}) {
      yield put({
        type: 'setLocaleSuccess',
        payload,
      });
    }
  },

  reducers: {
    getMenuSuccess(state, { payload }) {
      return {
        ...state,
        menu: payload,
        flatMenu: getFlatMenu(payload),
      };
    },
    setLocaleSuccess(state, { payload }) {
      return {
        ...state,
        locale: payload,
      };
    },
  },
});

export function getFlatMenu(menus) {
  let menu = [];
  menus.forEach(item => {
    if (item.children) {
      menu = menu.concat(getFlatMenu(item.children));
    }
    menu.push(item);
  });
  return menu;
}

// export async function getMenu(payload) {
//   return $$.post('/user/menu', payload);
// }
