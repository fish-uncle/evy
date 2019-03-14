import {createModelActions} from '../utils/action';

export default {

  namespace: 'search',

  state: {
    collapsed: false
  },

  subscriptions: {},

  effects: {},

  reducers: {
    search_toggle(state) {
      return {...state, collapsed: !state.collapsed};
    },
    search_close(state) {
      return {...state, collapsed: false};
    }
  },

};
export const SearchActions = createModelActions(this.default);