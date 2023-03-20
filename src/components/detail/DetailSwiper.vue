<template>
    <div class="swiper" :class="name" >
        <div class="swiper-wrapper" >
           <slot></slot>
        </div>
    </div>
</template>
<script setup>

import Swiper from 'swiper/bundle'
import 'swiper/swiper-bundle.css'
import {onMounted,defineProps} from 'vue'
 
const props =defineProps({
  perview:{
    type: Number,
    default: 1
  },
  name: {
    type: String,
    default: ''
  }
})

onMounted(() => {
  new Swiper('.' + props.name, {
        slidesPerView: props.perview,
        spaceBetween: 15,
        freeMode: true
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
