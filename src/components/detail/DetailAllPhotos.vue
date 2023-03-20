<template>
    <div>
        <van-nav-bar :title="`剧照 (${props.list.length})`" @click-left="handClick">
            <template #left>
                <van-icon name="arrow-left" color="black" size="20"/>
            </template>
        </van-nav-bar>

        <div class="photos-list">
            <div v-for="data in props.list" :key="data" :style="{
                backgroundImage:'url('+data+')'
              }" @click="handPreview()">
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>

</style>

<script setup>
import {defineProps,onMounted,inject} from 'vue'
import { useRouter } from 'vue-router';
import { showImagePreview } from 'vant';
const router=useRouter()

const props = defineProps({
    list:{
        type:Object,
        default:()=>{
            return []
        }     
    }   
})

//注入父组件剧照详情状态
const isPhotoAllShow=inject('isPhotoAllShow')

const handClick=()=>{
    console.log(isPhotoAllShow)
    isPhotoAllShow.value=false
}

//查看剧照详情
const handPreview=()=>{
  showImagePreview ({
        images: props.list,
        closeable: true,
        closeIconPosition:'top-left'
      })
  }    

</script>

<style lang="scss">
.van-nav-bar__title{
    font-weight: 500;
}
.photos-list{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background: white;
    
    div{
        width: 33%;
        height: 0;
        padding-top: 33%;
        margin: .125rem;
        margin-left: 0px;
        background-size: cover;
        background-position: center;
    }
}
</style>
