import {GET, POST, PUT, DELETE, HEAD, OPTIONS, PATCH} from '../utils/request';

/**
 * 获取首页banner列表
 * */
export function getUsers(body) {
  return GET('/user.json', body);
}