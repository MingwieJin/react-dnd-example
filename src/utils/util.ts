import cookie from 'js-cookie';
// import moment from 'moment';
import { AES, enc } from 'crypto-js';

// 转化obj的key和value
export const keyToValue = (obj: Record<string, number | string>) => {
  const res: Record<string, number | string> = {};
  // eslint-disable-next-line guard-for-in, no-restricted-syntax
  for (const key in obj) {
    res[obj[key]] = key;
  }
  return res;
};

// aes加密
export function aes() {
  const secretKey = 'xxxxxxx';
  return {
    encrypt: (str: string) => AES.encrypt(str, secretKey).toString(),
    decrypt: (str: string) => AES.decrypt(str, secretKey).toString(enc.Utf8),
  };
}

// 清除登录cookie
export function removeUserCookies() {
  cookie.remove('D_USER');
}

// 不需要登录的页面
export function isNoLoginPage(path: string) {
  return (
      path.startsWith('/login') ||
      path.startsWith('/register') ||
      path.startsWith('/home') ||
      ['/404', '/500', '/403'].includes(path)
  );
}

interface LoaderParms {
  src: string;
  width: number;
  quality?: number;
}

// 转圈
export const myNextImgLoader = (params: LoaderParms) =>
    `${params.src}?w=${params.width}&q=${params.quality || 100}`;

// 颜色转化为图
export const rgbDataURL = (r: number, g: number, b: number) => {
  // Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
  const keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  /* eslint-disable */
  const triplet = (e1: number, e2: number, e3: number) =>
      keyStr.charAt(e1 >> 2) +
      keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
      keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
      keyStr.charAt(e3 & 63);
  /* eslint-disable */
  return `data:image/gif;base64,R0lGODlhAQABAPAA${
      triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;
};
