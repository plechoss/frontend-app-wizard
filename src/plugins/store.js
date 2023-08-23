import Vuex from 'vuex'
import Vue from 'vue';

import apiConnector from '@/apiConnector';

Vue.use(Vuex)

const modules = {}
const state = {
  maxPageNum: 1,
  users: []
}
const actions = {
  async refreshUserList({ commit }, pageNum) {
    const res = await apiConnector.getUsers(pageNum);
    console.log({ res })
    commit('SET_USERS', res.data.data);
    commit('SET_MAX_PAGE_NUM', res.data.total_pages)
  }
}
const getters = {
  getMaxPageNum: (state) => state.maxPageNum,
  getUsers: (state) => state.users
}
const mutations = {
  SET_MAX_PAGE_NUM(state, maxPageNum) {
    Vue.set(state, 'maxPageNum', maxPageNum)
  },
  SET_USERS(state, users) {
    Vue.set(state, 'users', users)
  }
}

export default new Vuex.Store({
  actions,
  getters,
  modules,
  mutations,
  state
});