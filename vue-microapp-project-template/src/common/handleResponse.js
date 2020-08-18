/* eslint-disable */
import get from '@xes/dh-module-getter'
// TODO: handleResponse统一在api模块处理 yangbo
// 根据状态码统一处理返回结果
export const handleResponse = (getData, reskey) => {
  return getData.then((res) => {
    const strategy = {
      '0'(resData) {
        if(resData) {
          Object.defineProperty(resData, 'get', {
            value: (path, defaultValue) => {
              return get(resData, path, defaultValue);
            },
            writable: false,
            enumerable: false
          });
        }
        return resData;
      },
      default(message) {
        throw new Error(message);
      }
    };
    // 去掉了res.data
    let isSuccessText = res.error_code === 0 || res.error_code === '0' || res.status === 1 ? '0': '';
    if (strategy[isSuccessText]) {
      const resdata = reskey ? res.result[reskey] : res.result;
      return strategy[isSuccessText](resdata);
    } else {
      strategy['default'](res.message);
    }
  }).catch((e)=>{
    console.log(e);
  });
};
