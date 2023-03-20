<template>
    <div>
        <nav-bar v-show="obj.isShow" @event="handEvent" myname="111" ></nav-bar>
    </div>
</template>
<script>
import navBar from '@/base/components/Nav.vue'
import {reactive} from 'vue'
export default {
    components:{
        navBar
    },
    setup() {
        const obj=reactive({
            isShow:true
        })
        const handEvent=()=>{
            obj.isShow=false
        }
        return {
            obj,handEvent
        }
    },
}
</script>