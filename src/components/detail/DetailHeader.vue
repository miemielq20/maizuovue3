<template>
    <div class="header">
        <div class="icon-wrap" :class="isShow?'':'show'"><i class="iconfont icon-xiajiantou" @click="handBack()"></i></div>
        <slot></slot>
    </div>
</template>
<style lang="scss" scoped>
.header {
    width: 100%;
    background: transparent;
    height: 5.5rem;
    text-align: center;
    position: fixed;
    top: 0px;
    color: transparent;
    .show{
      background: skyblue;
      color: #2c3e50;
      opacity: 0.5;
    }
    .icon-wrap{
        width: 3.75rem;
        height: 3.75rem;
        background: white;
        border-radius: 50%;
        position: fixed;
        left: .625rem;
        top: .875rem;
        i{
        font-size: 3.75rem;
        display: inline-block;
        transform: rotate(90deg);
    }
    }

}
</style>

<script setup>
import {defineProps} from 'vue'
import { useRouter } from 'vue-router';
const router=useRouter()

const props = defineProps({
  isShow: {
    type: Boolean,
    default: false
  }
})

const handBack=()=>{
    router.back()
}

    

</script>
