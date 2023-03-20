<template>
  <div v-show="obj.leave">
      <van-search v-model="obj.value" show-action placeholder="请输入搜索关键词" @update:model-value="onSearch"  @cancel="onCancel" class="search" />
      <div class="list" v-show="obj.isShow" :style="{
          height:obj.height
      }">
          <cinemas-list :list="computedList" :isShow="obj.isShow"></cinemas-list>
      </div>

      <div class="cinema-init-area" v-show="obj.value?false:true" :style="{
          height:obj.height
      }">
          <div class="cinema-init-list">
              <div class="title">离你最近</div>
              <ul class="init-list">
                  <li class="list-item"  v-for="data in computedCityList" :key="data.cinemasId">{{ data.name }}</li>
              </ul>
          </div>
      </div>
      <div class="empty" v-show="obj.value?!obj.isShow:obj.isShow">
          <img src="https://assets.maizuo.com/h5/v5/public/app/img/rectangle@2x.2bdf0374.png" alt="">
          <p>没有找到匹配的影院</p>
          <p>提示：仅支持搜索“影院”</p>
          <p>建议您检查输入的影院名称是否有误？</p>
      </div>
  </div>
</template>
<script setup>
import BetterScroll from 'better-scroll'
import cinemasList from '@/components/cinemas/CinemasList.vue'
import {reactive,nextTick,onMounted,computed,inject,onUnmounted} from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

  const store=useStore()
  const router=useRouter()

  const isShow=inject('isTabbarShow')

  const obj=reactive({
      value: '',
      isShow: false,
      height: '0px',
      leave:true,
      scroll:'',
  })
 
  /* 搜索筛选 */
  const computedList=computed(()=>{
      return store.state.cinemasList.filter(item => {
          return item.name.toUpperCase().includes(obj.value.toUpperCase()) ||
                 item.address.toUpperCase().includes(obj.value.toUpperCase())
      })
  })

  /* 最近城市 */
  const computedCityList=computed(()=>{
      return store.state.cinemasList.slice(0, 5)
  })

  

  /* 搜索内容显示 */
  const onSearch = () => {
      /*滑轮条初始化*/
      if (computedList.value.length !== 0 && obj.value !== '') { 
          obj.isShow = true 
           nextTick(() => {
              if(!obj.scroll){
              obj.scroll= new BetterScroll('.list', {
                scrollbar: {
                  fade: true,
                  interactive :true
                },
                mouseWheel:true
              })
              }else{
                /* 复用 */
                obj.scroll.refresh()
              }
          })
       } 
      else {
            obj.isShow = false
      }
  }

  /* 返回升一级 */
  const onCancel =()=> {
      obj.leave=false
      router.back()
  }
      

  /* 动态结算高度 */
  onMounted(async () => {
    obj.height =
    document.documentElement.clientHeight -
    document.querySelector('.van-search').offsetHeight +
     'px'

    if (store.state.cinemasList.length === 0) {
      store.dispatch('getCinemasData',store.state.cityId).then(async res => {
      })
    }
    isShow.value=false
  })

  onUnmounted(() => {
    isShow.value=true
  })


</script>
<style lang="scss" scoped>
.search{
  position: fixed;
  top: 0;
  width: 100%;
  border-bottom: 1px solid #ededed;
  z-index: 100000;
}
.list{
    overflow: hidden;
    position: relative;
    margin-top: 5.5rem;
}
.cinema-init-area{
  padding-top: 5.5rem;
  .cinema-init-list{
      padding: 1.875rem 0 0 0;

      .title{
          font-size: 1.625rem;
          color: #bdc0c5;
          margin-left: 1.875rem;
          margin-top: .625rem;
      }
      .init-list{
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          .list-item{
              height: 30px;
              background-color: hsla(0,0%,95.7%,.6);
              line-height: 14px;
              border-radius: 3px;
              -webkit-box-sizing: border-box;
              box-sizing: border-box;
              font-size: 13px;
              padding: 8px 12px;
              margin-top: 1.875rem;
              margin-left: 1.875rem;
          }
      }
  }
}
.empty{
  position: absolute;
  top: 25rem;
  width: 100%;
  text-align: center;
  img{
      width: 11.25rem;
  }
  p{
      font-size: 1.375rem;
      color: #bdc0c5;
      padding-top: .625rem;
  }
}
</style>
