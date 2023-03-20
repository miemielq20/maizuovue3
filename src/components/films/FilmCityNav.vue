<template>
    <div>
        <van-nav-bar title="电影" :fixed="true" @click-left="hangClick" :border="true">
            <template #left >
                <span class="city">北京</span>
                <van-icon name="arrow-down" size="1rem" color="black"/>
            </template>
        </van-nav-bar>
    </div>
</template>

<style lang="scss" scoped>
    
    .van-nav-bar__content{
        border-bottom: .125rem solid #ededed;
        box-sizing: border-box;
    }

    .van-nav-bar__title{
        font-weight: normal;
    }

    .city{
        font-size: 1rem;
    }
</style>

<script setup>
import {useRouter} from 'vue-router';
const router=useRouter()
    const hangClick=()=>{
        router.push('/city')
    }
</script>