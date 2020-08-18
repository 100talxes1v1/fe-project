import apiFn from '@/api/index';
import { toCamelCase } from '@xes/dh-module-request';
import urlHelper from '@xes/dh-module-url';

const state = () => ({
  // 权限列表 - 未处理
  authTree: []
});

export const mutations = {
  updateAuthList(state, newList) {
    state.authTree = [...newList];
  }
};

const actions = {
  /**
   * 从接口获取权限列表1
   * @returns {Promise}
   */
  getAuthList({ commit }) {
    return apiFn.getFisAuthority().then(data => {
      let list = toCamelCase(data.result).page || [];
      // 解析页面资源的URL上的query参数
      list.forEach(pageItem => {
        if (pageItem.url) {
          let { path, query } = urlHelper.analyze(pageItem.url);
          pageItem.path = path;
          pageItem.query = query;
        }
      });
      commit('updateAuthList', list);
    });
  }
};

export default { namespaced: true, state, mutations, actions };
