<template>
    <div class="footer-nav">
      <ul>
            <router-link to="/films" custom v-slot='{navigate,isActive}'>
              <li @click="navigate" :class="isActive?'bottomActive':''">
                <i class="iconfont icon-dianying"></i>
                <span>电影</span>
                </li>
            </router-link>
    
            <router-link to="/cinemas" custom v-slot='{navigate,isActive}'>
              <li @click="navigate" :class="isActive?'bottomActive':''">
                <i class="iconfont icon-yingyuan"></i>
                <span>影院</span>
                </li>
            </router-link>
    
            <router-link to="/center" custom v-slot='{navigate,isActive}'>
              <li @click="navigate" :class="isActive?'bottomActive':''">
                <i class="iconfont icon-wodeguanzhu"></i>
                <span>我的</span>
                </li>
            </router-link>
        </ul>
    </div>
    </template>
    
    <style lang="scss">
    .bottomActive{
        color: orange;
      }
    .footer-nav{
      width: 100%;
      height: 6.125rem;
      position: fixed;
      bottom: 0;
      background: white;
      ul{
        height: 100%;
        display: flex;
        align-items: center;
        li{
        flex: 1;
        list-style: none;
        text-align: center;
        display: flex;
        flex-direction: column;
        i{
          font-size: 2.5rem;
        }
        span{
          font-size: 1rem;
        }
      }
      }
    }
    </style>
    