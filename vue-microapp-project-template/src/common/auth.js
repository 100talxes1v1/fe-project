
import store from '@/store/index';
import tree from '@/common/tree';
import urlHelper from '@xes/dh-module-url';
import get from '@xes/dh-module-getter';

// 项目初始化时调用
let isFirstLoad = true;
export function fetchAuth() {
  if (isFirstLoad && get(store, 'state.auth.authTree', []).length == 0) {
    isFirstLoad = false;
    return Promise.all([
      // 获取配置属性
      store.dispatch('auth/getAuthList')
    ]);
  } else {
    return Promise.resolve();
  }
}

export function hasPermit(authName) {
  return store.state.auth.authTree.some(item => {
    return !tree(item).find(item => item.code === authName).isEmpty();
  });
}

/**
 * 根据url获取对象信息，没有对象则返回null
 * @param {string} url
 */
export function getAuthItemByUrl(url) {
  if (url.indexOf('?') > -1) {
    let { path, query } = urlHelper.analyze(url);
    return getAuthItemByPathAndQuery(path, query);
  }
  let trees = store.state.auth.authTree.map(item => tree(item));
  for (let treeItem of trees) {
    let result = treeItem.find(item => item.url === url && item.path === url);
    if (!result.isEmpty()) return result.src;
  }
  return null;
}

/**
 * 根据path和query获取对象信息，没有对象则返回null
 * @param {string} path
 * @param {any} query
 */
export function getAuthItemByPathAndQuery(path, query = {}) {
  let trees = store.state.auth.authTree.map(item => tree(item));
  for (let treeItem of trees) {
    let result = treeItem.find(item => {
      if (item.path === path) {
        let isQueryEqual = true;
        if (item.query) {
          for (let k in item.query) {
            if (item.query[k] !== query[k]) {
              isQueryEqual = false;
              break;
            }
          }
        }
        return isQueryEqual;
      } else {
        return false;
      }
    });
    if (!result.isEmpty()) return result.src;
  }
  return null;
}

export function hasLogin() {
  let token = getToken();
  return !!token;
}

function getToken() {
  let strUserInfo = localStorage.getItem('userInfo');
  if (strUserInfo) {
    let userInfo = JSON.parse(strUserInfo);
    if (userInfo.access_token) {
      return userInfo.access_token;
    }
  }
}

export function getUserInfo() {
  let strUserInfo = localStorage.getItem('userInfo');
  if (strUserInfo) {
    let userInfo = JSON.parse(strUserInfo);
    return userInfo;
  } else {
    return null;
  }
}
