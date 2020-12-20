import Vue from 'vue';
import Vuex from 'vuex';
import { getStores } from '@/common/require_in_folder';

Vue.use(Vuex);
const stores = getStores();

const storeOption = {
  strict: process.env.NODE_ENV !== 'production', // eslint-disable-line no-undef
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    ...stores,
  },
};

export default new Vuex.Store(storeOption);
