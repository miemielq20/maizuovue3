<template>
  <div class="cinemas">
    <van-nav-bar title="影院" @click-left="handLeft" @click-right="handRight">
      <template #left>
        {{ store.state.cityName }} <van-icon name="arrow-down"  size="6" color="black" />
      </template>
      <template #right>
        <van-icon class-prefix="iconfont icon-search" size="18"  color="black"/>
      </template>
  </van-nav-bar>
    <div class="list" :style="{
      height: obj.height
    }">
    <cinemas-list :list="store.state.cinemasList" ></cinemas-list>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.cinemas {
  background: rgba(221, 220, 221, 0.4);
  .list {
    overflow: hidden;
    position: relative;
  }
}
</style>
<script setup>
import http from '@/util/http'

import BetterScroll from 'better-scroll'
import cinemasList from '@/components/cinemas/CinemasList.vue'

import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import {reactive,computed,onMounted,nextTick} from 'vue'

const obj=reactive({
  datalist: [],
  height: '0px'
})

const store=useStore()
const router=useRouter()

const handLeft=()=>{
  router.push('/city')
  store.commit('clearCinemasList')
}

const handRight=()=>{
  router.push('/cinemas/search')
 }

 onMounted(async () => {
  // 动态结算高度
  obj.height =
      document.documentElement.clientHeight -
      document.querySelector('.van-nav-bar').offsetHeight -
      document.querySelector('.footer-nav').offsetHeight +
       'px'

  if (store.state.cinemasList.length === 0) {
      store.dispatch('getCinemasData',store.state.cityId).then(async res => {
        /* 需要在异步请求结束后执行 */
        await nextTick(() => {
          new BetterScroll('.list', {
              scrollbar: {
                fade: true,
              },
              mouseWheel: true
            })
      })
      })
  } else {
    /* 缓存后也要调用一次 */
    await nextTick(() => {
      new BetterScroll('.list', {
        scrollbar: {
          fade: true,
        },
        mouseWheel: true
      })
    })
  }     
 })

</script>
