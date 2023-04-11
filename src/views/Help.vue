<template>
    <div>
        help
    </div>
</template>

<script setup>
import {inject,onMounted,onUnmounted} from 'vue'

const isShow=inject('isTabbarShow')

onMounted(() => {
   isShow.value=false
 })

 onUnmounted(() => {
   isShow.value=true
 })
</script>