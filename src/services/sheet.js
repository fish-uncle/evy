import {GET, POST, PUT, DELETE, HEAD, OPTIONS, PATCH} from '../utils/request';

/**
 * 获取首页banner列表
 * */
export function getButton(body) {
  return GET('/api/button', body);
}