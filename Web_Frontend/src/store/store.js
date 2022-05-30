import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: null,
    userId: null
  },
  getters: {
    getToken() {
      return state.token;
    },
    getUserId() {
      return state.userId;
    }
  },
  mutations: {
    SignIn(state, data){
      state.token = data.token
      state.userId = data.userId

      // 여기서 기본으로 해두면 각 페이지에서 검사해서 오류면 로그인창으로??
      localStorage.setItem('access_token', data.token)
      localStorage.setItem('user_id', data.userId)
      axios.defaults.headers.common['x-access-token'] = `${data.token}`
    },
    signOut(state){
      state.token = null
      state.userId = null
      axios.defaults.headers.common['x-access-token'] = ''
      localStorage.setItem('access_token', '')
      localStorage.setItem('user_id', '')
    },
    auth(state, data){
      state.token = data.token
      state.userId = data.userId
      axios.defaults.headers.common['x-access-token'] = `${data.token}`
    }
  },
  actions: {
    signIn({commit}, data){
      commit('SignIn',{
        token: data.jwt,
        userId: data.userId
      })
    },
    signOut({commit}){
      commit('signOut')
    },
    auth({commit}){
      const token = localStorage.getItem("access_token")
      const userId = localStorage.getItem("user_id")
      commit('auth',{
        token: token,
        userId: userId
      })
    }
  }
})

export { store };
