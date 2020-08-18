import apiFn from '@/api/index';
export default {
  namespaced: true,
  state: {
    commonConfig: {},
    regionConfig: {}
  },
  mutations: {
    updateCommonConfig(state, result) {
      state.commonConfig = result
    },
    updateRegionConfig(state, result) {
      state.regionConfig = result
    },
  },
  actions: {
    getCluesCommonConfig({ commit }) {
      apiFn.getCluesCommonConfig().then(res => {
        if (res.get('error_code') === 0) {
          commit('updateCommonConfig', res.get('result', {}));
        }
      });
    },
    getRegionConfig({ commit }) {
      apiFn.getRegionConfig().then(res => {
        if (res.get('error_code') === 0) {
          commit('updateRegionConfig', res.get('result', {}));
        }
      });
    }
  }
}