import axios from 'axios'

const state = {
  user: null,
  crew: null,
  pending: false,
  error: null
}

const getters = {
  get: (state) => {
      return state.user
  },
  crew: (state) => {
    return state.crew
  },
  isError: (state) => {
      return state.error !== null
  },
  getErrorCode: (state) => {
      var res = null
      if(state.error !== null && state.error.hasOwnProperty("response") && state.error.response.hasOwnProperty("status")) {
          res = state.error.response.status
      }
      return res
  }
}

const actions = {
  init(store) {
      // sets `state.loading` to true. Show a spinner or something.
      store.commit('API_USER_PENDING')

      return axios.get('/drops/webapp/identity', {
        headers: {
          "Access-Control-Allow-Credentials": "true"
        }
      })
      .then(response => {
          // sets `state.loading` to false
          // also sets `state.apiData to response`
          const data = {
            user: response.data.additional_information.id,
            crew: null
          }
          if(response.data.additional_information.profiles[0].supporter.crew){
            data.crew = response.data.additional_information.profiles[0].supporter.crew.id;
          }
          store.commit('API_USER_SUCCESS', data.user, data.crew)
      })
      .catch(error => {
          // set `state.loading` to false and do something with error
          store.commit('API_USER_FAILURE', error)
          switch(error.response.status){
            case 401:
              // Not Authenticated!
              //ToDo use generic uri
              window.location.replace('/arise/#/signin/L2Vtb3RvLyMvbW9vZC9mb3Jt')
              break;
          case 403:
              // Forbidden!
              window.location.replace('/arise/#/error/403')
              break;
          case 404:
              // redirect 404 error page
              window.location.replace('/arise/#/error/404')
              break;
          case 500:
              // redirect 500 error page
              window.location.replace('/arise/#/error/500')
              break;
          }
      })
  }
}

const mutations = {
  API_USER_PENDING(state) {
      state.user = null
      state.crew = null
      state.pending = true
      state.error = null
  },
  API_USER_SUCCESS(state, user, crew) {
      state.user = user
      state.crew = crew
      state.pending = false
      state.error = null
  },
  API_USER_FAILURE(state, error) {
      state.user = null
      state.crew = null
      state.pending = false
      state.error = error
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};