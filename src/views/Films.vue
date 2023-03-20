<template>
  <div class="main">
     <film-city-nav v-show="isShow" class="city-header"></film-city-nav>
     <film-header :class="isShow?'header':''" v-scroll-directive="{
      time:200,getTrue,getFalse
     }"></film-header>
      <router-view></router-view>
  </div>
</template>
<style lang="scss" scoped>
.main{
  padding-bottom: 6.85rem;
  background: rgba(221, 220, 221, 0.4);

  .header{
    position: fixed;
    top: 5.75rem;
    z-index: 10000;
  }

  
}


</style>
<script setup>
  import filmHeader from '@/components/films/FilmHeader.vue';
  import filmCityNav from '@/components/films/FilmCityNav';
  import {onMounted, ref} from 'vue';
  import axios from 'axios';
  import vScrollDirective from '@/util/vScrollDirective'

  const datalist=ref([])
  const isShow=ref(false)

  const getTrue=()=>{
    isShow.value = true
  }

  const getFalse=()=>{
    isShow.value = false
  }
  


  
</script>
