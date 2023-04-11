import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { List,Cell,Image,VanImage,NavBar,Icon,ImagePreview,Search, IndexBar, IndexAnchor,Button,Uploader,Field, CellGroup } from 'vant';
import 'vant/lib/index.css'
import VueCookies from 'vue3-cookies'
import HTTP from './util/logoin'


createApp(App)
.use(List)
.use(Cell)
.use(Image)
.use(Icon)
.use(NavBar)
.use(ImagePreview)
.use(Search)
.use(IndexBar)
.use(IndexAnchor)
.use(Button)
.use(Uploader)
.use(Field)
.use(CellGroup)
.use(VueCookies)
.use(store)
.use(router)
.mount('#app')

router.beforeEach((to, from, next) => {
    if(to.path=='/login'){
       next()
    }else if(to.meta.isRequired){
        const token =localStorage.getItem('token')
        if(!token){
            next('/login')
        }else{
            next()
        }
    }else{
        next()
    }

})

HTTP.interceptors.request.use(function (config) {
    const token=localStorage.getItem('token')
    token? config.headers['user-token'] = token:config.headers['user-token'] = 'false'
    return config
  }, function (error) {
    return Promise.reject(error)
  })
  
  HTTP.interceptors.response.use(function (response) {
    return response
  }, function (error) {
    if(error.response.status==401){
      localStorage.removeItem("token")
      store.commit('changeLogin',false)
      store.commit('changeUserPhone','')
      store.commit('changeUserId','')
    }
    return Promise.reject(error)
  })
