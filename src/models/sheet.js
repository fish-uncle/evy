import {createModelActions} from '../utils/action';
import {getUsers} from '../services/user'

export default {

  namespace: 'sheet',

  state: {
    dataSource: [],
    loading: false,
    page: {
      current: 0,
      total: 0
    },
    columns: [],
  },

  subscriptions: {},

  effects: {
    * sheet_load({payload, callback}, {call, put}) {
      try {
        const result = yield call(getUsers, payload);
        yield put({
          type: 'r_sheet_load',
          payload: result
        });
        typeof callback === 'function' && callback(result);
      } catch (e) {
        console.error('eff_applyCreditCard报错了： ', e);
      }
    },
  },

  reducers: {
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