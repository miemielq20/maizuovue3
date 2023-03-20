<template>
    <div class="swiper-slide">
        <slot></slot>
    </div>
</template>
<script setup>
import {reactive, ref} from 'vue'

const datalist=ref([])
</script>

<style lang="scss">

</style>
