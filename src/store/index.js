import { createStore } from 'vuex'
import http from '@/util/http'
import HTTP from '@/util/logoin'
//vuex 持久化
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  //持久化状态
  plugins: [createPersistedState({
    reducer: (state) => {
      return {
        cityId: state.cityId,
        cityName: state.cityName,
        isLogin:state.isLogin,
        myPhone:state.myPhone,
        userId:state.userId
      }
    }
  })],

  state: {
    cityId: 310100,
    cityName: '上海',
    cinemasList: [],
    isLogin:false,
    myPhone:"",
    userId:''
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
    changeLogin(state, login) {
      state.isLogin = login
    },
    changeUserId(state, id) {
      state.userId = id
    },
    changeUserPhone(state, myPhone) {
      state.myPhone = myPhone
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
     },

     getUserList(store){
      return  HTTP({
        url:`/users/?UserPhone=${store.state.myPhone}`,
        method:'get',
        headers:{
         'Content-Type':'application/json;charset=utf-8',
        },
      })
     }
  },
  modules: {
  }
})
