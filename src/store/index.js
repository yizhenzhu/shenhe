import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'

// import {createStore} from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    // plugins:[createPersistedState()],
  state: {
    tagsList: [],
    collapse: false,
    webSocketMsg: "",
    webSocketMsgtwo: "",
    nav:[],
  },
  mutations: {
    readMsg(state, webSocketMsg) {
      state.webSocketMsg = webSocketMsg
    },
    readMsgtwo(state, webSocketMsgtwo) {
      state.webSocketMsgtwo = webSocketMsgtwo
    },
    delTagsItem(state, data) {
      state
        .tagsList
        .splice(data.index, 1);
    },
    setTagsItem(state, data) {
      state
        .tagsList
        .push(data)
    },
    clearTags(state) {
      state.tagsList = []
    },
    closeTagsOther(state, data) {
      state.tagsList = data;
    },
    closeCurrentTag(state, data) {
      for (let i = 0, len = state.tagsList.length; i < len; i++) {
        const item = state.tagsList[i];
        if (item.path === data.$route.fullPath) {
          if (i < len - 1) {
            data
              .$router
              .push(state.tagsList[i + 1].path);
          } else if (i > 0) {
            data
              .$router
              .push(state.tagsList[i - 1].path);
          } else {
            data
              .$router
              .push("/");
          }
          state
            .tagsList
            .splice(i, 1);
          break;
        }
      }
    },
    setnav(state,data){
      state.nav=data
    },
    // 侧边栏折叠
    hadndleCollapse(state) {
   
    }
  },
  actions: {
    SETNAV({commit},data){
      commit('setnav',data)
    }
  },
  modules: {}
})
export default store
