import modelEnhance from '../../../../utils/modelEnhance';
import PageHelper from '../../../../utils/pageHelper';
import { routerLinks } from "../../../constant";
/**
 * True when the page is first loaded
 * You can use this value to prevent switching pages when
 * Initialize data multiple times
 */
let LOADED = false;
export default modelEnhance({
  namespace: 'crud',

  state: {
    pageData: PageHelper.create(),
    employees: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((props) => {
        if (!LOADED) {
          LOADED = true;
          dispatch({
            type: 'init'
          });
        }
      });
    }
  },

  effects: {
    // Enter page load
    *init({ payload }, { put, select }) {
      const { pageData } = yield select(state => state.crud);
      yield put({
        type: 'getPageInfo',
        payload: {
          pageData: pageData.startPage(1, 10)
        }
      });
      yield put({
        type: 'getEmployees'
      });
    },
    // Get paging data
    *getPageInfo({ payload }, { put }) {
      const { pageData } = payload;
      yield put({
        type: '@request',
        payload: {
          valueField: 'pageData',
          url: '/crud/getList',
          pageInfo: pageData
        }
      });
    },
    // Save after querying paging
    *save({ payload }, { put, select, take }) {
      const { values, success } = payload;
      const { pageData } = yield select(state => state.crud);
      yield put({
        type: '@request',
        payload: {
          notice: true,
          url: '/crud/save',
          data: values
        }
      });
      // Waiting for @request to end
      yield take('@request/@@end');
      yield put({
        type: 'getPageInfo',
        payload: { pageData }
      });
      success();
    },
    // modify
    // *update({ payload }, { call, put }) {},
    // Delete after querying paging
    *remove({ payload }, { put, select }) {
      const { records, success } = payload;
      const { pageData } = yield select(state => state.crud);
      yield put({
        type: '@request',
        payload: {
          notice: true,
          url: '/crud/bathDelete',
          data: records.map(item => item.rowKey)
        }
      });
      yield put({
        type: 'getPageInfo',
        payload: { pageData }
      });
      success();
    },
    // Get employee list
    *getEmployees({ payload }, { put }) {
      yield put({
        type: '@request',
        afterResponse: resp => resp.data,
        payload: {
          valueField: 'employees',
          url: '/crud/getWorkEmployee'
        }
      });
    }
  },

  reducers: {}
});
