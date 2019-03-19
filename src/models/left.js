import {createModelActions} from '../utils/action';
import {GET} from "../utils/request";

export default {

  namespace: 'left',

  state: {
    collapsed: false, // 左侧导航栏的展开状态
    breadcrumb: [],
    selectedKey: [],
    openKeys: [],
    menu: null
  },

  subscriptions: {},

  effects: {
    * left_load({payload, callback}, {call, put}) {
      try {
        const result = yield call(_ => {
          return GET('/api/menu')
        });
        yield put({
          type: 'r_left_load',
          payload: result
        });
        typeof callback === 'function' && callback(result);
      } catch (e) {
        console.error('left_load报错了： ', e);
      }
    }
  },

  reducers: {
    r_left_load(state, {payload}) {
      const {list} = payload;
      let menu = {}, openKeys = [], selectedKeys = [], breadcrumb = [];
      for (let i = 0; i < list.length; i++) {
        if (!list[i]['nexus']) {
          for (let j = 0; j < list.length; j++) {
            let obj = menu[list[i]['menu_id']] ? menu[list[i]['menu_id']] || list[i] : list[i];
            if (list[j]['url'] === location.hash.replace('#', '')) {
              openKeys = [list[j]['nexus']];
              selectedKeys = [list[j]['menu_id']];
              breadcrumb = [list[j]['title']];
            }
            if (list[j]['nexus'] === list[i]['menu_id']) {
              if (obj.children) {
                obj.children.push(list[j]);
              } else {
                obj.children = [list[j]]
              }
            }
            menu[list[i]['menu_id']] = obj;
          }
        }
      }
      openKeys[0] ? void 0 : openKeys = state.openKeys;
      return {...state, menu, openKeys, selectedKeys, breadcrumb};
    },
    left_choose(state, {payload}) {
      const {title} = payload;
      return {...state, breadcrumb: [title]};
    },
    left_openKey(state, {payload}) {
      const {openKeys} = payload;
      return {...state, openKeys};
    },
    left_toggle(state) {
      return {...state, collapsed: !state.collapsed};
    },
    left_close(state) {
      return {...state, collapsed: true};
    }
  },

};
export const LeftActions = createModelActions(this.default);