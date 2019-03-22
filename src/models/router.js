import {routerRedux} from 'dva/router';
import routerConfig from '../routerConfig';
import config from '../models/config';
import {createModelActions} from '../utils/action';

export default {
  namespace: 'router',
  state: {},
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(async ({pathname}) => {
        const len = routerConfig.length;
        for (let i = 0; i < len; i++) {
          const con = routerConfig[i];
          if (checkPath(pathname, con)) {
            doAfterMatch(con);
          }
        }
      });
    }
  },
  effects: {
    // 使用方法 this.props.push('/')
    * push({payload}, {put}) {
      location.hash.replace('#', '') === payload ? void 0 :
        yield put(routerRedux.push(payload));
    },
    // 使用方法 this.props.goBack('/')
    * goBack({payload}, {put}) {
      yield put(routerRedux.goBack());
    },
    // 使用方法 this.props.replace('/')
    * replace({payload}, {put}) {
      yield put(routerRedux.replace(payload));
    },
    // 使用方法 this.props.go(-1)
    * go({payload}, {put}) {
      yield put(routerRedux.go(payload));
    },
    // 使用方法 this.props.goForward()
    * goForward({payload}, {put}) {
      yield put(routerRedux.goForward(payload));
    },
  },
  reducers: {}
};

export const RouterActions = createModelActions(this.default);

function checkPath(path, config) {
  const arr1 = path.split('/');
  const arr2 = config.path.split('/');

  if (arr1.length !== arr2.length) {
    return false;
  }
  const len = arr1.length;
  for (let i = 0; i < len; i++) {
    const val1 = arr1[i];
    const val2 = arr2[i];
    const ind = val2.indexOf(':');
    switch (ind) {
      case -1:
        if (val2 !== val1) {
          return false;
        }
        break;
      case 0:
        break;
      default:
        if (val1.slice(0, ind) !== val2.slice(0, ind)) {
          return false;
        }
    }
  }
  return true;
}

function doAfterMatch(con) {
  const {title} = con;
  title ? document.title = title : document.title = config.state.title;
}
