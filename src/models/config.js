import {createModelActions} from '../utils/action';

export default {

  namespace: 'config',

  state: {
    title: 'DDM',
    logo: {white: require('../imgs/logo-white.png'), gray: require('../imgs/logo-gray.png')},
    icp: '浙ICP备17040239号',
    copyRight: `Copyright © ${new Date().getFullYear()} DDM `
  },

  subscriptions: {},

  effects: {},

  reducers: {},

};
export const ConfigActions = createModelActions(this.default);