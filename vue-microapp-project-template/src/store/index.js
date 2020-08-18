import Vue from 'vue';
import Vuex from 'vuex';

import common from './common.js';
import auth from './auth.js';
Vue.use(Vuex);

const storeOption = {
  strict: process.env.NODE_ENV !== 'production',// eslint-disable-line no-undef
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    common,
    auth,
  }
};

export default new Vuex.Store(storeOption);
