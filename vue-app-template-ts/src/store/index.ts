import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const storeOption = {
  strict: process.env.NODE_ENV !== 'production',// eslint-disable-line no-undef
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {}
};

export default new Vuex.Store(storeOption);
