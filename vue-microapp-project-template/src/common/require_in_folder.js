/**
 * 获取指定目录下符合正则匹配的文件的导出
 * @param {string} path 文件目录 默认当前目录
 * @param {string} filterReg 被过滤的文件的正则匹配 默认不为index.js
 * @param {string} key 默认获取export.default的导出内容
 */
export const getContextByInCurrent = () => {
  return require.context('./', true, /[^(index)+].js/);
};

export const getApis = () => {
  const context = require.context('@/api', true, /^.\/((?!index).)+.js$/);
  let apis = {};
  context.keys().forEach(key => {
    apis = { ...apis, ...context(key).default };
  });
  return apis;
};

export const getStores = () => {
  const context = require.context('@/store', true, /^.\/((?!index).)+\.js$/);
  let stores = {};
  context.keys().forEach(key => {
    const fileName = key.replace(/.\/(.*)+\.js/, '$1');
    stores = { ...stores, [fileName]: context(key).default };
  });
  return stores;
};
