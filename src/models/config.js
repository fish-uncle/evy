import {createModelActions} from '../utils/action';

export default {

  namespace: 'config',

  state: {
    title: 'DDM',
    logo: require('../assets/logo-white.png'),
    icp: '浙ICP备17040239号',
    copyRight: `Copyright © ${new Date().getFullYear()} DDM `
  },

  subscriptions: {},

  effects: {},

  reducers: {},

};
export const ConfigActions = createModelActions(this.default);