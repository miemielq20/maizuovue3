<template>
    <div>
       {{obj.myname}} 
       <button @click="handClick">点击</button>
    </div>
</template>
<script>
import {reactive} from 'vue'
export default {
    /* X相当于以前的beforeCreate 和create */
    setup() {
       const obj = reactive({
        myname:"你好"
       })
       const handClick=()=>{
        obj.myname="jjj"
       }
       return{
        obj,handClick
       }
    },
}
</script>