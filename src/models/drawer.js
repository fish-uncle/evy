import {createModelActions} from '../utils/action';

export default {

  namespace: 'drawer',

  state: {
    visible: false
  },

  subscriptions: {},

  effects: {},

  reducers: {
    drawer_show(state) {
      return {...state, visible: true};
    },
    drawer_close(state) {
      return {...state, visible: false};
    }
  },

};
export const DrawerActions = createModelActions(this.default);