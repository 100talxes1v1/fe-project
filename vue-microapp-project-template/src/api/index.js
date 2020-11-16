import env from '@xes/dh-module-env';
import { AjaxRequest } from '@xes/dh-module-request';
import { Message } from 'element-ui';
import qs from 'qs';
import get from '@xes/dh-module-getter';
import { getProductLine } from '@xes/dh-module-product-line';

import commonApi from './common.js'

const ajax = new AjaxRequest({
  headers: {
    'Dahai-Product-Line': 'management-platform'
  },
  baseURL: env.baseURL
});
// 请求前和收到响应之后可以加入拦截器
const errorWhiteList = [1018101, 1018005]; // 错误码白名单(不需要弹出toast的错误码)
const responseHandler = (res) => {
  if (res.error_code && res.error_code !== 0 && (!errorWhiteList.includes(res.error_code))) {
    Message({
      message: `${res.message}`,
      type: 'error',
      duration: 5 * 1000
    });
  }
  if(res) {
    Object.defineProperty(res, 'get', {
      value: (path, defaultValue) => {
        return get(res, path, defaultValue);
      },
      writable: false,
      enumerable: false
    });
  }
  return res;
};
const responseErrorHandler = (error) => {
  throw error;
};
ajax.registerRequestInterceptor((req) => {
  // 注入产品线参数
  req.headers['X-Trailer-Biz-Product-Line'] = getProductLine();
  return req;
});
ajax.registerResponseInterceptor(responseHandler, responseErrorHandler);


const apis = {...commonApi, };
let apiFn = {
  getDefault: function (url, params) {
    return ajax.get(url, params);
  },
  postDefault: function (url, params) {
    return ajax.post(url, params);
  }
};
Object.keys(apis).forEach((item) => {
  if (item.includes('post')) {
    apiFn[item] = (params, toCamelCase = false, withCredentials = true) => {
      return ajax.post(apis[item], params, { withCredentials, toCamelCase });
    };
  } else {
    apiFn[item] = (params, toCamelCase = false, withCredentials = true, contentType = {}) => {
      return ajax.get(apis[item], params, { withCredentials, toCamelCase, contentType });
    };
  }
});


// 请求promise的缓存
const requestCache = new Map();
// 同样的请求和参数，全局只请求一次
function getDataWithCache(url, params = {}) {
  let key = qs.stringify({
    url,
    ...params
  });
  if (requestCache.has(key)) {
    return requestCache.get(key);
  } else {
    let pro = ajax.get(url, params);
    requestCache.set(key, pro);
    return pro;
  }
}

function clearRequestCache() {
  requestCache.clear();
}

export { ajax, getDataWithCache, clearRequestCache };

export default apiFn;
