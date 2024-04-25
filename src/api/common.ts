import request from 'src/utils/request';
import api from 'src/constants/api';
import getConfig from 'next/config';

const { API_HOST, API_VERSION } = getConfig().publicRuntimeConfig;
/**
 * -----------------------------------------
 * 登录相关
 * -----------------------------------------
 */
// 登录
export function login() {
  return request.get<any>(api.login);
}

/**
 * -----------------------------------------
 * 用户相关
 * -----------------------------------------
 */

interface UserOverviewResult {
  companyName: string;
  email: string;
  nickname: string;
  stage: number;
  userId: number;
}

interface UserDetailResult extends UserOverviewResult {
  avatar: string;
  id: number;
  industry: number;
  name: string;
  phone: string;
  isProductWindowOpen?: boolean;
  taskPermission?: boolean;
  postTaskPermission?: boolean;
  isBindDict?: boolean;
  loginUser?: Record<string, any>;
  verified?: boolean;
}

// 请求用户信息
export function getUserDetail() {
  return request.get<UserDetailResult>(api.getUserDetail);
}


