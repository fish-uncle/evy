import {createModelActions} from '../utils/action';

export default {

  namespace: 'modal',

  state: {
    visible: false
  },

  subscriptions: {},

  effects: {},

  reducers: {
    modal_show(state) {
      return {...state, visible: true};
    },
    modal_close(state) {
      return {...state, visible: false};
    }
  },

};
export const ModalActions = createModelActions(this.default);