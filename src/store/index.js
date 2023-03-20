import { createStore } from 'vuex'
import http from '@/util/http'
//vuex 持久化
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  //持久化状态
  plugins: [createPersistedState({
    reducer: (state) => {
      return {
        cityId: state.cityId,
        cityName: state.cityName
      }
    }
  })],

  state: {
    cityId: 310100,
    cityName: '上海',
    cinemasList: [],
  },

  getters: {
  
  },
  mutations: {
    changeCityName (state, cityName) {
      state.cityName = cityName
    },
    changeCityId (state, cityId) {
      state.cityId = cityId
    },
    changeCinemasList (state, data) {
      state.cinemasList = data
    },
    clearCinemasList (state, data) {
      state.cinemasList = []
    },
  },
  actions: {
    getCinemasData (store, cityId) {
      return http({
         url: `gateway?cityId=${cityId}&ticketFlag=1&k=3727970`,
         headers: {
           'X-Host': 'mall.film-ticket.cinema.list'
         }
       }).then((res) => {
        console.log(res.data.data.cinemas)
         store.commit('changeCinemasList', res.data.data.cinemas)
       })
     }
  },
  modules: {
  }
})
