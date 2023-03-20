<template>
  <div class="list"> 
    <van-list v-model="obj.loading" :finished="obj.finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
      <van-cell v-for="data in obj.datalist" :key="data.filmId" @click="handChangePage(data.filmId)" class="item-list">
        <img :src="data.poster">
        <div class="nowPlayingFilm-info">
          <div class="nowPlayingFilm-info-name" v-if="obj.datalist"><span class="name">{{ data.name }}</span><span class="item">{{
            data.item.name }}</span></div>
          <div class="nowPlayingFilm-info-grade"><span :class="data.grade?'grade':'grade hidden'"> 观众评分  <span>{{ data.grade }}</span> </span></div>
          <div class="nowPlayingFilm-info-actor"><span>主演：{{ actorFilter(data.actors) }}</span></div>
          <div><span>{{ data.nation }}</span> | <span>{{ data.runtime }}分钟</span></div>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>
<script setup>
import http from '@/util/http'
import {onMounted,reactive} from 'vue'
import {useRouter} from 'vue-router';

import {closeToast } from 'vant';
import {toast1} from '@/util/loading'

import {useStore} from 'vuex'

const obj=reactive({
    datalist:[],
    finished: false,
    loading: false,
    current: 1,
    total: 0
})

const store=useStore()

const router=useRouter()
//获取正在热映电影数据
onMounted(() => {
  toast1()
  http({
      url: `/gateway?cityId=${store.state.cityId}&pageNum=1&pageSize=10&type=1&k=5394180`,
      headers: {
        'X-Host': 'mall.film-ticket.film.list',
      }
    }).then(res => {
      obj.datalist = res.data.data.films
      obj.total = res.data.data.total
      closeToast(true)
    })
})

  //跳转对应详情页面
  const handChangePage=(id)=>{
    router.push(`/detail/${id}`)
  }

  //判断主演是否为空
  const actorFilter=(data)=>{
    if (data === undefined) return '暂无主演'
      return data.map(item => item.name).join(' ')
    }

   //数据列表触底加载
   const onLoad=()=>{
    console.log(obj.datalist.length,obj.total)
      //数据加载完停止
      if (obj.datalist.length === obj.total && obj.total !== 0) {
          obj.finished = true
          return
      }
      //数据页数增加
      obj.current++
      //请求列表数据
      http({
      url: `gateway?cityId=${store.state.cityId}&pageNum=${obj.current}&pageSize=10&type=1&k=1030751`,
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
      obj.datalist = [...obj.datalist, ...res.data.data.films]
      /* loading 主动设置为false */
      obj.loading = false
    })
   }
  

</script>

<style lang="scss">
    .list{
      position: relative;

    }
    .loading{
      background-color: #ededed;
      color: #bdc0c5;
      width: 100%;
      height:6.25rem;
      max-width: 100%;
      min-height: 6.25rem;
      flex-direction: row;
      position: absolute;
      top: 0;
      box-sizing: border-box;
      border-radius:0%;
      transform:translateY(0%);
    }
  .item-list{
    overflow: hidden;
    padding: 1.875rem;
    line-height: 3rem;
    background-color: #fff;
    img {
      width: 8.25rem;
      float: left;
    }

    .nowPlayingFilm-info {
      font-size: 1rem;
      color: #797d82;
      padding-left: 9rem;
      text-align: left;

      .nowPlayingFilm-info-name {
        font-size: 2rem;
        color: black;
        display: flex;
        align-items: center;
        text-align: left;

        .item {
          color: #fff;
          background-color: #d2d6dc;
          padding: 0 .125rem;
          border-radius: .125rem;
          display: inline-block;
          font-size:1rem;
          height: 2rem;
          line-height: 2rem;
          margin: .25rem 0  0 .625rem;

        }
      }

      .nowPlayingFilm-info-grade {
        .grade {
          span{
            color: orange;
          }
        }
        .hidden{
          visibility: hidden;
        }
      }

      .nowPlayingFilm-info-actor {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

</style>