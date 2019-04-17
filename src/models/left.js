import {createModelActions} from '../utils/action';
import {GET} from "../utils/request";

export default {

  namespace: 'left',

  state: {
    collapsed: false, // 左侧导航栏的展开状态
    breadcrumb: [],
    selectedKeys: [],
    openKeys: [],
    menu: null
  },

  subscriptions: {},

  effects: {
    * left_load({payload, callback}, {call, put}) {
      try {
        const result = yield call(_ => {
          return GET('/api/menu/auth')
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
      let obj = {};
      if (openKeys) {
        openKeys[0] ? void 0 : openKeys = state.openKeys;
        obj = Object.assign({}, obj, {openKeys: openKeys})
      } else {
        const openKeys = localStorage.getItem('openKeys');
        if (openKeys) {
          obj = Object.assign({}, obj, {openKeys: openKeys.split('#')})
        }
      }
      if (selectedKeys.length) {
        obj = Object.assign({}, obj, {selectedKeys: selectedKeys})
      } else {
        const selectedKeys = localStorage.getItem('selectedKeys');
        if (selectedKeys) {
          obj = Object.assign({}, obj, {selectedKeys: selectedKeys.split('#')})
        }
      }
      if (breadcrumb.length) {
        document.title = 'EVY-' + breadcrumb[0];
        obj = Object.assign({}, obj, {breadcrumb: breadcrumb})
      } else {
        const title = localStorage.getItem('title');
        if (title) {
          document.title = title;
          obj = Object.assign({}, obj, {breadcrumb: [title]})
        }
      }
      return {...state, menu, ...obj};
    },
    left_choose(state, {payload}) {
      const {title} = payload;
      localStorage.setItem('title', title);
      document.title = title;
      return {...state, breadcrumb: [title]};
    },
    left_openKeys(state, {payload}) {
      const {openKeys} = payload;
      localStorage.setItem('openKeys', openKeys.join('#'));
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