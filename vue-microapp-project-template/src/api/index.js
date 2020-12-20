import env from '@xes/dh-module-env';
import { AjaxRequest } from '@xes/dh-module-request';
import { Message } from 'element-ui';
import qs from 'qs';
import get from '@xes/dh-module-getter';
import { getProductLine } from '@xes/dh-module-product-line';
import { getApis } from '@/common/require_in_folder';
import { customErrorMessages, errorWhiteList } from '@/common/api_error_code';

const apis = getApis();

const ajax = new AjaxRequest({
  headers: {
    'Dahai-Product-Line': 'management-platform'
  },
  baseURL: env.baseURL
});

const responseHandler = res => {
  const { error_code, message, result } = res;

  if (error_code && ~~error_code !== 0) {
    if (!errorWhiteList.includes(res.error_code)) {
      Message({
        message: customErrorMessages[error_code] || message,
        type: 'error',
        duration: 5 * 1000,
      });
    }
    return Promise.reject({ error_code, message, result });
  }
  if (res) {
    Object.defineProperty(res, 'get', {
      value: (path, defaultValue) => {
        return get(res, path, defaultValue);
      },
      writable: false,
      enumerable: false,
    });
  }
  return res;
};
const responseErrorHandler = error => {
  Message.error('网络错误，请刷新页面重试！');
  throw error;
};

const requestHandler = req => {
  // 注入产品线参数
  req.headers['X-Trailer-Biz-Product-Line'] = getProductLine();
  return req;
};

const requestErrorHandler = error => {
  throw error;
};

ajax.registerRequestInterceptor(requestHandler, requestErrorHandler);
ajax.registerResponseInterceptor(responseHandler, responseErrorHandler);

let apiFn = {
  getDefault: function (url, params) {
    return ajax.get(url, params);
  },
  postDefault: function (url, params) {
    return ajax.post(url, params);
  },
};
Object.keys(apis).forEach(item => {
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
    ...params,
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

