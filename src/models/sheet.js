import {createModelActions} from '../utils/action';
import request from '../utils/request';

export default {

  namespace: 'sheet',

  state: {
    // 右侧悬浮框
    drawerVisible: false,
    drawerType: 'detail',
    detailData: {},
    search: {},
    form: {},
    validate: {},
    // 表格
    dataSource: [],
    formatter: value => value,
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
    insertCallBack: () => {
    },
    updateCallBack: () => {
    },
    deleteCallBack: () => {
    },
    loadCallback: data => data,
    rowKey: '',
    columns: [],
    // 请求地址
    listUrl: '',
    exportUrl: '',
    recoveryUrl: '',
    recoverUrl: '',
    insertUrl: '',
    updateUrl: '',
    deleteUrl: '',
    importUrl: ''
  },

  subscriptions: {},

  effects: {
    * sheet_page({payload, callback}, {call, put, select}) {
      try {
        const sheet = yield select(state => state.sheet);
        const {page} = payload;
        const {listUrl, search, loadCallback} = sheet;
        let param = {pageNum: page.current, pageSize: 10};
        param = Object.assign({}, search, param);
        const result = yield call(_ => {
          return request.get(listUrl, {params: param})
        });
        yield put({
          type: 'r_sheet_page',
          payload: page
        });
        yield put({
          type: 'r_sheet_load',
          payload: loadCallback(result)
        });
      } catch (e) {
        console.error('sheet_load报错了： ', e);
      }
    },
    * sheet_load({payload, callback}, {call, put, select}) {
      try {
        const sheet = yield select(state => state.sheet);
        const {page, listUrl, search, loadCallback} = sheet;
        let param = {pageNum: page.current, pageSize: 10};
        param = Object.assign({}, search, param);
        const result = yield call(_ => {
          return request.get(listUrl, {params: param})
        });
        yield put({
          type: 'r_sheet_load',
          payload: loadCallback(result)
        });
      } catch (e) {
        console.error('sheet_load报错了： ', e);
      }
    }
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
      let {
        columns, rowKey, loadCallback = data => data, dataSource = [], formatter = value => value, insertCallBack = () => {
        }, updateCallBack = () => {
        }, deleteCallBack = () => {
        }
      } = payload;
      return {
        ...state,
        columns,
        rowKey,
        dataSource,
        loadCallback,
        formatter,
        insertCallBack,
        updateCallBack,
        deleteCallBack
      };
    },
    sheet_search(state, {payload}) {
      const {values} = payload;
      return {...state, search: values};
    },
    sheet_button_event(state, {payload}) {
      let buttonEvent = Object.assign({}, state.buttonEvent, {[payload.type]: payload.callback});
      return {...state, buttonEvent};
    },
    r_sheet_page(state, {payload = {}}) {
      let page = Object.assign({}, state.page, payload);
      return {...state, page};
    },
    sheet_url(state, {payload}) {
      const {listUrl, insertUrl, updateUrl, deleteUrl, exportUrl, recoveryUrl, recoverUrl, importUrl} = payload;
      return {...state, listUrl, insertUrl, updateUrl, deleteUrl, exportUrl, recoveryUrl, recoverUrl, importUrl};
    },
    set_validate(state, {payload}) {
      let validate = Object.assign({}, state.validate, payload.validate);
      return {...state, validate};
    },
    clear_validate(state, {payload}) {
      return {...state, validate: {}};
    },
  },

};
export const SheetActions = createModelActions(this.default);