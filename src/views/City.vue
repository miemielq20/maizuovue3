<template>
  <div>
      <van-nav-bar title="当前城市" :fixed="true" :z-index="999" :placeholder="true">
          <template #left>
              <van-icon name="cross" size="20"  color="black" @click="handBack"/>
          </template>
      </van-nav-bar>
      <van-search v-model="obj.value" placeholder="输入城市或拼音"  :show-action="obj.isSearchBtnShow"  @search="onSearch" @cancel="onCancel" @focus="obj.isSearchBtnShow=true" />
      <div class="recommend-city">
          <div class="hot-city" >
              <div class="hot-city-title">热门城市</div>
              <div class="city-item-detail">
                  <div class="city-item-text" v-for="data in obj.hotCity" :key="data.cityId" @click="handClick(data)">{{ data.name }}</div>
              </div>
          </div>
      </div>

      <div>
          <van-index-bar :index-list="computedList" @change="handChange">
              <div v-for="data in obj.datalist"  :key="data.type">
                  <van-index-anchor :index="data.type" />
                  <van-cell v-for="item in data.list"  :title="item.name" :key="item.cityId" @click="handClick(item)"/>
              </div>
          </van-index-bar>
      </div>
  </div>
</template>
<style lang="scss" scoped>
.van-search{
  width: 100%;
  position: fixed;
  top: 5.75rem;
  z-index: 999;
}
.recommend-city{
  background: white;
  padding-top:6.75rem;
  .hot-city{
      height: 15rem;
      padding: 0 2.125rem 0 1.875rem;
      .hot-city-title{
          font-size: 1.625rem;
          color: #797d82;
      }
      .city-item-detail{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          flex-wrap:wrap;
          padding-right: 1.5rem;
          padding-left: 1.5rem;
          .city-item-text {
              width:30%;
              height: 3.75rem;
              line-height: 3.75rem;
              font-size: 1.75rem;
              text-align: center;
              background-color: #f4f4f4;
              margin-top: 1.875rem
          }
      }
  }
}

</style>>
<script setup>
import http from '@/util/http'
import { reactive ,computed,onMounted,inject, onUnmounted} from 'vue';
import {useRouter} from 'vue-router';
import {useStore} from 'vuex'
import {showToast} from 'vant';

  const router=useRouter();
  const store=useStore();

  const obj =reactive({
    datalist: [],
    hotCity: [],
    value: '',
    isSearchBtnShow: false       
  })

  const isShow=inject('isTabbarShow')

  /* 把空的城市数据索引去掉 */
  const computedList=computed(()=>{
    return obj.datalist.map(item => item.type)
  })

  /* 选择城市并跳转首页刷新 */
  const handClick=(item)=>{
      store.commit('changeCityName', item.name)
      store.commit('changeCityId', item.cityId)
      router.push('/films/nowplaying')
  }

  /* 返回上一级 */
  const handBack= ()=> {
    router.back()
  }

  /* 滑动字母位置提示 */
  const handChange= (data)=> {
    showToast(data)
  }

  /* 筛选热门城市 */
 const computedHotList= (List) => {
    const newHotList = List.filter(item => {
      return item.isHot === 1
    })
      obj.hotCity = newHotList
    }



 const onSearch = (val) => {
    console.log(val)
 }
 
 
 const onCancel= ()=> {
    obj.isSearchBtnShow = false
 }
        

  const renderCity= (List)=> {
    /* 创建26个字母 */
    const arr = []
    for (let i = 65; i < 91; i++) {
      arr.push(String.fromCharCode(i))
    }
    /* 排序 */
    arr.forEach(Litter => {
      const newList = List.filter(item => {
      return item.pinyin.toUpperCase().substring(0, 1) === Litter
    })

      if (newList.length !== 0) {
        obj.datalist.push({
          type: Litter,
          list: newList
        })
      }

    })
  }
  
  onMounted(() => {
    http({
          url: 'gateway?&k=3727970',
          headers: {
              'X-Host': 'mall.film-ticket.city.list'
          }
          }).then(res => {
              renderCity(res.data.data.cities)
              computedHotList(res.data.data.cities)
    })
    isShow.value=false
  })

  onUnmounted(() => {
    isShow.value=true
  })

    

</script>
