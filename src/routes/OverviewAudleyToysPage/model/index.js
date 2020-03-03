import modelEnhance from '../../../utils/modelEnhance';
import { routerLinks } from "../../constant";

export default modelEnhance({
  namespace: 'overviewaudleytoyspage',

  state: {
    dataSource: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        dispatch({
          type: '@request',
          afterResponse: resp => resp.data,
          payload: [{
            valueField: 'dataSource',
            url: '/tree/getData',
          }]
        });
      });
    }
  },

  effects: {},

  reducers: {}
});
