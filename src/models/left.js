import {createModelActions} from '../utils/action';

export default {

  namespace: 'left',

  state: {
    collapsed: false, // 左侧导航栏的展开状态
    breadcrumb: ['Home', 'User'],
    menu: [
      {
        "nexus": "b9e0656b-27b3-4a8a-8f93-fd9dc335c9ea",
        "title": "菜单管理",
        "type": "1",
        "url": "/menuCenter"
      }, {
        "nexus": "",
        "title": "帮助中心",
        "type": "1",
        "url": "/helpCenter.html"
      }, {
        "nexus": "",
        "title": "帮助中心",
        "type": "1",
        "url": "/helpCenter.html"
      }
    ]
  },

  subscriptions: {},

  effects: {},

  reducers: {
    left_choose() {

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