import apiFn from '@/api/index';
import {isVipx} from '@/common/utils.js';
export default {
  namespaced: true,
  state: {
    actionName: '全部',
    tabList: [
      {
        name: '全部',
        label: '全部0',
        id: 'all'
      },
      {
        name: '待首联',
        label: '待首联0',
        id: 'to_contact'
      },
      {
        name: '待邀约',
        label: '待邀约0',
        id: 'to_invite'
      },
      {
        name: '待诊断',
        label: '待诊断0',
        id: 'to_diagnose'
      },
      {
        name: '待转化',
        label: '待转化0',
        id: 'to_conversion'
      },
      {
        name: '已成单',
        label: '已成单0',
        id: 'payorder'
      }
    ],
    activateList: [
      {
        value: 'all',
        label: '全部0',
        name: '全部'
      },
      {
        value: 'new_clue',
        label: '新线索0',
        name: '新线索'
      },
      {
        value: 'repeat_clue',
        label: '重复注册0',
        name: '重复注册'
      },
      {
        value: 'my_claim_clue',
        label: '我的认领0',
        name: '我的认领'
      },
      {
        value: 'old_allot_clue',
        label: '老线索再分配0',
        name: '老线索再分配'
      },
      {
        value: 'manmul_allot_clue',
        label: '手动分配0',
        name: '手动分配'
      },
    ],
    listData: {
      total: 0,
      list: []
    },
    callType: 0,
    chance_status_map:{"all":0,"to_contact":20,"to_invite":30,"to_diagnose":40,"to_conversion":50,"payorder":70},
    activation_mode_map: {"all":0,"new_clue":1,"repeat_clue":2,"my_claim_clue":3,"old_allot_clue":4,"manmul_allot_clue":5},
  },
  mutations: {
    updateActionName(state, actionName) {
      state.actionName = actionName
    },
    updateTabList(state, list) {
      state.tabList = [...list]
    },
    updateActivateList(state, list) {
      state.activateList = [...list]
    },
    updateListData(state, result) {
      state.listData = [...result]
    },
    updateCallType(state, callType) {
      state.callType = callType
    },
  },
  actions: {
    getTabList({ commit, state }) {
      let params = {
        business_id: isVipx() ? 2 : 1
      }
      apiFn.getChanceTabMenu(params).then(res => {
        if (res.get('error_code') === 0) {
          let map = res.get('result', {});
          let tabList = state.tabList.map(item => ({
            id: item.id,
            name: item.name,
            label: item.name + map[item.id]
          }));
          commit('updateTabList', tabList);
        }
      });
    },
    getChanceActivationMode({ commit, state }) {
      let tabId = state.tabList.find(item => item.name === state.actionName).id
      let params = {
        business_id: isVipx() ? 2 : 1,
        chance_status: state.chance_status_map[tabId]
      }
      apiFn.getChanceActivationMode(params).then(res => {
        if (res.get('error_code') === 0) {
          let map = res.get('result', {});
          let list = state.activateList.map(item => {
            return {
              value: item.value,
              label: item.name + map[item.value],
              name: item.name
            }
          });
          console.log(list);
          commit('updateActivateList', list);
        }
      });
    },
    getChanceList({ commit }) {
      let params = {
        page: 1,
        page_size: 10
      }
      apiFn.postChanceList(params).then(res => {
        if (res.get('error_code') === 0) {
          commit('updateListData', res.get('result', {total: 0, list: []}));
        }
      });
    },
    updateCallType({commit}) {
      commit('updateCallType', callType);
    }
  }
}