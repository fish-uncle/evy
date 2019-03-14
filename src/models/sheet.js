import {createModelActions} from '../utils/action';
import {GET, POST, PUT, DELETE, HEAD, OPTIONS, PATCH} from '../utils/request';

export default {

  namespace: 'sheet',

  state: {
    dataSource: [],
    button: [],
    loading: false,
    page: {
      current: 0,
      total: 0
    },
    url: '/api/user',
    columns: [],
  },

  subscriptions: {},

  effects: {
    * sheet_load({payload, callback, ...other}, {call, put}) {
      try {
        const {page, url} = payload;
        const result = yield call(_ => {
          return GET(url, {page: page.current})
        });
        yield put({
          type: 'r_sheet_load',
          payload: result
        });
        typeof callback === 'function' && callback(result);
      } catch (e) {
        console.error('r_sheet_load报错了： ', e);
      }
    },
  },

  reducers: {
    sheet_button(state, {payload}) {
      return {...state, button: payload};
    },
    r_sheet_load(state, {payload}) {
      const {list, total} = payload;
      let page = Object.assign({}, state.page, {total});
      return {...state, page, dataSource: list};
    },
    sheet_page(state, {payload}) {
      let page = Object.assign({}, state.page, payload);
      return {...state, page};
    },
  },

};
export const SheetActions = createModelActions(this.default);