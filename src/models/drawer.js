import {createModelActions} from '../utils/action';

export default {

  namespace: 'drawer',

  state: {
    detailVisible: false,
    searchVisible: false,
    data: {},
    search: {},
    getFieldDecorator: () => {
    }
  },

  subscriptions: {},

  effects: {},

  reducers: {
    drawer_detail_show(state, {payload = {data: {}}}) {
      const {data} = payload;
      return {...state, detailVisible: true, data};
    },
    drawer_set(state, {payload}) {
      const {getFieldDecorator} = payload;
      return {...state, getFieldDecorator};
    },
    drawer_detail_close(state) {
      return {...state, detailVisible: false};
    }
  },

};
export const DrawerActions = createModelActions(this.default);