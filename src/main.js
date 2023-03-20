import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { List,Cell,Image,VanImage,NavBar,Icon,ImagePreview,Search, IndexBar, IndexAnchor } from 'vant';
import 'vant/lib/index.css'
/* import 'amfe-flexible' */

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
.use(store)
.use(router)
.mount('#app')
