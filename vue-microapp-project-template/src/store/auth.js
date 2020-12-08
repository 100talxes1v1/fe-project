import apiFn from '@/api/index';
import { toCamelCase } from '@xes/dh-module-request';
import urlHelper from '@xes/dh-module-url';

const state = () => ({
  // 权限列表 - 未处理
  authTree: [],
  // 页面与产品线的映射表
  pageProductLineMap: {}
});

export const mutations = {
  updateAuthList(state, newList) {
    state.authTree = [...newList];
  },
  updatePageProductLine(state, rolePageList) {
    const result = {};
    rolePageList.forEach(rolePage => {
      const pl = rolePage.biz_product_line;
      const pages = rolePage.page_url;
      if (pages && pages.length > 0) {
        pages.forEach(p => {
          p = p.trim();
          let { path } = urlHelper.analyze(p);
          result[path] = result[path] || new Set();
          result[path].add(pl);
        });
      }
    });
    state.pageProductLineMap = result;
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
          let { path, query } = urlHelper.analyze(pageItem.url.trim());
          pageItem.path = path;
          pageItem.query = query;
        }
      });
      commit('updateAuthList', list);
    });
  },
  async getProductLineRolePage({ commit }) {
    // const data = await apiFn.getProductLineRolePage(); TODO:
    const data = await Promise.resolve({
      result: {
        list: [
          { role_id: 1, biz_product_line: 1, page_url: [ '/plus/portal/list/role' ] },
          { role_id: 2, biz_product_line: 2, page_url: [ '/plus/portal/home', '/plus/portal/clue/my' ] },
          { role_id: 3, biz_product_line: 2, page_url: [ '/plus/portal/authority/organization', '/plus/portal/authority/menu-management' ] }
        ]
      }
    });
    if (data.result.list && data.result.list.length > 0) {
      commit('updatePageProductLine', data.result.list);
    }
  }
};

export default { namespaced: true, state, mutations, actions };
