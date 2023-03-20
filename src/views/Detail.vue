<template>
 <div class="detail-main" :class="!isPhotoAllShow?'bottom-element':''">
   <div class="film" v-if=" obj.filmInfo" v-show="!isPhotoAllShow">  
    <detail-header class="film-header" v-scroll-directive="{
      time:45,getTrue,getFalse
     }" :class="obj.isHeader?'show-header':''" :isShow="obj.isHeader">
      <div class="film-header-title">{{ obj.filmInfo.name }}</div>
    </detail-header>
    <div class=film-poster :style="{
            backgroundImage:'url('+obj.filmInfo.poster+')'
          }">
    </div >

    <div class="film-detail">
      <div class=" film-detail-name"><span class="name">{{obj.filmInfo.name }}</span> <span class="item">{{obj.filmInfo.item.name}}</span> <span :class="obj.filmInfo.grade? 'grade':'grade-hide'"><i>{{obj.filmInfo.grade }}</i>分</span></div>
        <div class="film-detail-content">
          <div class=" film-detail-category">{{ obj.filmInfo.category }}</div>
              <div class="film-detail-date"> {{dateFilter(obj.filmInfo.premiereAt )}}上映</div>
              <div class="film-detail-nation-runtime">{{obj.filmInfo.nation}} | {{obj.filmInfo.runtime}}分钟</div>
              <div class="film-detail-synopsis" :class="obj.isHidden?'hidden':''">{{obj.filmInfo.synopsis}}</div>
              <div class="toggle"><i class="iconfont icon-xiajiantou" @click="obj.isHidden=!obj.isHidden" :class="obj.isHidden?'':'direction'"></i></div>
        </div>
     </div>

    <div class="film-actors">
        <div class="films-actors-title">演职人员</div>
        <div class="films-actors-list">
          <detail-swiper class="swiper" :perview="4" name="actors">
            <swiper-item v-for="(data,index ) in obj.filmInfo.actors" :key="index" class="swiper-item" >
              <div class="photo" :style="{
                backgroundImage:'url('+data.avatarAddress+')'
              }"></div>
              <div class="name">{{ data.name }}</div>
              <div class="role">{{ data.role }}</div>
            </swiper-item>
          </detail-swiper>
        </div>
    </div>

    <div class="film-photos">
        <div class="films-photos-title" @click="handPhotosAllClick"><span>剧照</span ><span class="photos-all"> 全部({{obj.filmInfo.photos.length}})<i class="iconfont icon-xiajiantou" ></i></span></div>
        <div class="films-photos-list">
          <detail-swiper class="swiper" :perview="2.5" name="photos">
            <swiper-item v-for="(data,index ) in obj.filmInfo.photos" :key="index" class="swiper-item" >
              <div class="photo" :style="{
                backgroundImage:'url('+data+')'
              }" @click="handPreview()"></div>
            </swiper-item>
          </detail-swiper>
        </div>
    </div>

    <div class="film-goSchedule">
      <a href="#">选择购票</a>
    </div>
  </div>
  <detail-all-photos v-if="obj.filmInfo" :list="obj?.filmInfo?.photos" class="photosAll" v-show="isPhotoAllShow"></detail-all-photos>
</div>
</template>
<script setup>
import http from '@/util/http'
import detailHeader from '@/components/detail/DetailHeader.vue'
import detailSwiper from '@/components/detail/DetailSwiper.vue'
import swiperItem from '@/components/films/FilmSwiperItem.vue'
import detailAllPhotos from '@/components/detail/DetailAllPhotos.vue'

import vScrollDirective from '@/util/vScrollDirective'

import { showImagePreview } from 'vant';
import {reactive,onMounted,onUnmounted,provide,ref} from 'vue';
import {useRoute} from 'vue-router';

import { inject} from "vue"



import moment from 'moment'
moment.locale('zh-cn')// 

/* 父组件tabBar 状态 */
const isShow=inject('isTabbarShow')

//转化时间戳为指定格式日期
const dateFilter=(date)=>{
    return moment(date * 1000).format('YYYY-MM-DD')
}

 const obj = reactive({
      filmInfo: null,
      isHidden: true,
      isHeader: false,
      isShow:true
})

//注册剧照详情状态
const isPhotoAllShow=ref(false)

//把组件传给子组件
provide('isPhotoAllShow',isPhotoAllShow)

const getTrue=()=>{
  obj.isHeader=true;
}

const getFalse=()=>{
  obj.isHeader=false;
}

//点击图片查看详情
const handPreview=()=>{
  showImagePreview ({
        images: obj.filmInfo.photos,
        closeable: true,
        closeIconPosition:'top-left'
      })
  }
  
  //点击显示剧照详情
  const handPhotosAllClick=()=>{
    isPhotoAllShow.value=true
  }

const route=useRoute()

  //渲染页面
  onMounted(() => {
    //console.log(route.params.id) // 匹配当前页面路由
    http({
      url: `gateway?filmId=${route.params.id}&k=6481686`,
      headers: {
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res => {
      obj.filmInfo = res.data.data.film
    })
    isShow.value=false
  })

  onUnmounted(() => {
    isShow.value=true
   })



</script>


<style lang="scss" scoped>
.detail-main{
  background: rgba(221, 220, 221, 0.4);
}

.bottom-element{
  padding-bottom: 7rem;
}

.photosAll{
  height: 100%;
}
.film{
  .show-header{
    background: white;
    color:#2c3e50;
  }
  .film-header{
    .film-header-title{
      font-size: 2.5rem;
      line-height: 5.5rem;
      z-index: 30000;
    }
  }
  .film-poster{
    width: 100%;
    height: 26.25rem;
    background-position: center;
    background-size: cover;
  }
  .film-detail{
    padding: 1.5rem 1.875rem 1.875rem;
    background: #fff;
    .film-detail-name{
      .name{
        font-size: 2.5rem;
      }
      .item{
        color: #fff;
          background-color: #d2d6dc;
          padding: 0 .125rem;
          border-radius: .125rem;
          font-size: .1rem;
          margin: .25rem 0  0 .625rem;
      }
      .grade-hide{
        display: none;
      }
      .grade{
        color: #ffb232;
       i{
        font-size: 2.25rem;
       }
        float: right;
      }
      .grad-hide{
        visibility: hidden;
      }
    }
    .film-detail-content{
      font-size: 1.625rem;
      color: #797d82;
      div{
        padding-top:1rem ;
      }
      .film-detail-synopsis{
        margin-top:.25rem
      }
      .hidden{
        height: 4.25rem;
        overflow: hidden;
      }
      .toggle{
        text-align: center;
        padding-top: 0rem;
        .direction{
            display: inline-block;
            &:hover{
              transform: rotate(180deg);
            }
        }
      }
    }
  }
  .film-actors,.film-photos{
    margin-top: 1.25rem;
    background: #fff;
    .films-actors-title,.films-photos-title{
      font-size: 2rem;
      padding: 1.875rem;
      .photos-all{
        font-size: 1.625rem;
        color: #797d82;
        float: right;
        i{
          display: inline-block;
          transform: rotate(270deg);
          font-size:1.875rem;
          position: relative;
          top: .175rem;
          left: -0.4375rem
        }
    }
    }
    .films-actors-list,.films-photos-list{
     .swiper{
      padding:0 1.875rem 1.875rem 1.875rem;
        .swiper-item{
          text-align: center;
          .name{
            margin-top: .75rem
          }
          .role{
            color: #797d82;
          }
          .photo{
            width: 100%;
            height: 9.375rem;
            background-size: cover;
            background-position: center;
          }
        }
      }
    }
  }
  .film-goSchedule{
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 999;
    a{
      text-decoration: none;
      color: white;
      display: block;
      background: orangered;
      width: 100%;
      height:6.125rem;
      line-height: 6.125rem;
      text-align: center;
      font-size: 1rem;
    }
  }
}


</style>