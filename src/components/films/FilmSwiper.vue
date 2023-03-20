<template>
    <div class="swiper kerwin" >
        <div class="swiper-wrapper" >
           <slot></slot>
        </div>
        <div class="swiper-pagination filmsSwiperSpan"></div>
    </div>
</template>
<script setup>
  import Swiper from 'swiper/bundle'
  import 'swiper/swiper-bundle.css'
  import {defineProps, onMounted} from 'vue';
  
  const props = defineProps({
    loop:{
      type: Boolean,
      default: true
    }
})

  onMounted(()=>{
    new Swiper('.kerwin', {
        loop: props.loop,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        /* 分页器 */
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      })
  })
</script>

<style lang="scss">
.filmsSwiperSpan{
  span{
    width: 1.25rem;
    height: 1.25rem;
  }

}
</style>
