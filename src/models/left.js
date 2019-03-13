import {createModelActions} from '../utils/action';

export default {

  namespace: 'left',

  state: {
    collapsed: false // 左侧导航栏的展开状态
  },

  subscriptions: {},

  effects: {},

  reducers: {
    left_toggle(state) {
      return {...state, collapsed: !state.collapsed};
    },
    left_close(state) {
      return {...state, collapsed: true};
    }
  },

};
export const LeftActions = createModelActions(this.default);