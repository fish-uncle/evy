import {createModelActions} from '../utils/action';
import {GET, POST, PUT, DELETE, HEAD, OPTIONS, PATCH} from '../utils/request';
import {getButton} from "../services/sheet";

export default {

  namespace: 'sheet',

  state: {
    dataSource: [],
    button: [],
    buttonEvent: {
      detail: () => {
      }
    },
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
    * sheet_button({payload, callback}, {call, put}) {
      try {
        const result = yield call(getButton);
        yield put({
          type: 'r_sheet_button',
          payload: result
        });
        typeof callback === 'function' && callback(result);
      } catch (e) {
        console.error('sheet_button报错了： ', e);
      }
    },
    * sheet_load({payload, callback}, {call, put}) {
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
        console.error('sheet_load报错了： ', e);
      }
    },
  },

  reducers: {
    r_sheet_button(state, {payload}) {
      return {...state, button: payload.list};
    },
    r_sheet_load(state, {payload}) {
      const {list, total} = payload;
      let page = Object.assign({}, state.page, {total});
      return {...state, page, dataSource: list};
    },
    sheet_button_event(state, {payload}) {
      let buttonEvent = Object.assign({}, state.buttonEvent, {[payload.type]: payload.callback});
      return {...state, buttonEvent};
    },
    sheet_page(state, {payload}) {
      let page = Object.assign({}, state.page, payload);
      return {...state, page};
    },
  },

};
export const SheetActions = createModelActions(this.default);