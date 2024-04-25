import axios from 'axios';
import qs from 'qs';
import getConfig from 'next/config';
import { message } from 'antd';
import { ERRORCODE, NotNeedToReportSentryErrorCodeOBJ } from 'src/constants';
import { isAxiosError } from './typeHelpers';
import { aes, removeUserCookies } from './util';
import { isServer } from './env-util';
import { RequestError } from './error';

export const checkToken = (code: string | number) => {
  let bool = true;
  // 没有权限
  if (
    code === ERRORCODE.VALID_CODE.AUTHENTICATION_EXPIRED ||
    code === ERRORCODE.VALID_CODE.AUTHENTICATION_FAILED
  ) {
    bool = false;
    removeUserCookies();
    if (!isServer()) {
      message.error('权限校验失败，请重新登录', 1, () => {
        window.location.href = '/login';
      });
    }
  }
  return bool;
};

interface RequestConfig {
  /**
   * http 请求方法
   */
  method?: 'get' | 'post' | 'put' | 'patch' | 'delete';

  /**
   * 请求头
   */
  headers?: Record<string, any>;

  /**
   * url 参数
   */
  params?: Record<string, any>;

  /**
   * 序列化params
   */
  paramsSerializer?: (params: any) => any;

  /**
   * body 参数
   */
  data?: any;

  maxBodyLength?: any;

  maxContentLength?: any;

  credentials?: any;

  cache?: any;

  mode?: any;

  responseType?: any;
}

interface CustomResponse<T = any> {
  /**
   * 后台定义的状态码
   */
  code: number;

  /**
   * 后台定义的 message
   */
  message: string;

  /**
   * 实际返回数据
   */
  data: T;
}

export interface CustomError {
  code: number;
  message: string;
  isAxiosError: boolean;
  data?: unknown;
  name?: unknown
}

const { API_HOST, API_VERSION } = getConfig().publicRuntimeConfig;

const instance = axios.create({
  baseURL: `${API_HOST}/${API_VERSION}`,
  timeout: 20000,
});

// instance.defaults.maxBodyLength = Infinity;
instance.defaults.maxContentLength = Infinity;
instance.defaults.withCredentials = true;

async function request<T>(url: string, config: RequestConfig): Promise<T> {
  const { params, data, headers, method } = config;

  // 处理这种情况 e.g. v1.0.0/tasks/{taskId}
  if (typeof params !== 'undefined') {
    // eslint-disable-next-line no-param-reassign
    url = url.replace(/{([\w]+)}/g, (s0, s1) => {
      const res = s1 in params ? params[s1] : s0;
      delete params[s1];
      return res;
    });
  }

  try {
    const res = await instance.request<CustomResponse<T>>({
      url,
      method,
      headers,
      params,
      data,
    });

    const { code: errorCode, data: result } = res.data;

    if (errorCode !== 0) {
      throw res.data;
    }

    return result;
  } catch (err: any) {
    let error: CustomError;

    if (axios.isCancel(err)) throw err;

    if (isAxiosError(err)) {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else if (err.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(err.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', err.message);
      }

      if (err.code === 'ECONNABORTED') {
        message.error('请求超时');
      }

      error = {
        // @ts-ignore
        code: err.response?.data?.code ?? err.response?.status ?? -1,
        // @ts-ignore
        message: err.response?.data?.message ?? err.message ?? '',
        isAxiosError: true,
      };
    } else {
      const { code = -1, message = '', data } = err;
      error = { code, message, isAxiosError: false, data };
    }

    // 处理token失效的错误
    checkToken(error.code);

    throw error;
  }
}

// 请求带上token
export function setAuth({ token }: { token: string }) {
  instance.defaults.headers.common['xxxxxx'] = token;
}

const api =  {
  get<T = any>(url: string, config: RequestConfig = {}): Promise<T> {
    return request<T>(url, {
      ...config,
      method: 'get',
      // maxBodyLength: Infinity,
      // maxContentLength: Infinity,
    });
  },
  post<T = any>(url: string, config: RequestConfig = {}): Promise<T> {
    return request<T>(url, {
      ...config,
      method: 'post',
      // maxBodyLength: Infinity,
      // maxContentLength: Infinity,
    });
  },
  put<T = any>(url: string, config: RequestConfig = {}): Promise<T> {
    return request<T>(url, { ...config, method: 'put' });
  },
  patch<T = any>(url: string, config: RequestConfig = {}): Promise<T> {
    return request<T>(url, { ...config, method: 'patch' });
  },
  delete<T = any>(url: string, config: RequestConfig = {}): Promise<T> {
    return request<T>(url, { ...config, method: 'delete' });
  },
};

export default api;
