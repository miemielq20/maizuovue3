<template>
 <div class="main">
  <router-view></router-view>
  <tabbar v-show="isShow"></tabbar>
 </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
}
.van-toast--text{
        min-width: 3.75rem;
 }
</style>
<script setup>
import tabbar from '@/components/Tabbar.vue'
import '@/assets/iconfont/iconfont.css'
import 'vant/lib/index.css'
import {provide, ref,onMounted} from 'vue'

const isShow=ref(true);
/* 把父组件状态传给子组件用，用来管理是否显示底部导航 */
provide('isTabbarShow',isShow)

onMounted(() => {
 
})
</script>
