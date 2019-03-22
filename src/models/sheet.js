import {createModelActions} from '../utils/action';
import {GET, POST, PUT, DELETE, HEAD, OPTIONS, PATCH} from '../utils/request';

export default {

  namespace: 'sheet',

  state: {
    // 右侧悬浮框
    drawerVisible: false,
    drawerType: 'detail',
    detailData: {},
    form: {},
    // 表格
    dataSource: [],
    buttonEvent: {
      insert: () => {
      },
      search: () => {
      },
      detail: () => {
      }
    },
    loading: false,
    page: {
      current: 1,
      total: 0
    },
    rowKey: '',
    columns: [],
    // 请求地址
    listUrl: '/api/user',
    exportUrl: '',
    recoveryUrl: '',
    recoverUrl: '',
    insertUrl: '',
    updateUrl: '',
    deleteUrl: '',
  },

  subscriptions: {},

  effects: {
    * sheet_load({payload, callback}, {call, put}) {
      try {
        const {page, listUrl} = payload;
        const result = yield call(_ => {
          return GET(listUrl, {page: page.current})
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
    drawer_show(state, {payload = {}}) {
      const {detailData = {}, drawerType = 'detail'} = payload;
      return {...state, drawerVisible: true, detailData, drawerType};
    },
    drawer_set(state, {payload}) {
      const {form} = payload;
      return {...state, form};
    },
    drawer_close(state) {
      return {...state, drawerVisible: false};
    },
    r_sheet_load(state, {payload}) {
      const {list, total} = payload;
      let page = Object.assign({}, state.page, {total});
      return {...state, page, dataSource: list};
    },
    sheet_set(state, {payload}) {
      let {columns, rowKey} = payload;
      return {...state, columns, rowKey, dataSource: []};
    },
    sheet_button_event(state, {payload}) {
      let buttonEvent = Object.assign({}, state.buttonEvent, {[payload.type]: payload.callback});

      return {...state, buttonEvent};
    },
    sheet_page(state, {payload = {}}) {
      let page = Object.assign({}, state.page, payload);
      return {...state, page};
    },
    sheet_url(state, {payload}) {
      const {listUrl, insertUrl, updateUrl, deleteUrl, exportUrl, recoveryUrl, recoverUrl} = payload;
      return {...state, listUrl, insertUrl, updateUrl, deleteUrl, exportUrl, recoveryUrl, recoverUrl};
    },
  },

};
export const SheetActions = createModelActions(this.default);