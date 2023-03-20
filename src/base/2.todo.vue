<template>
    <!-- <div>55555</div> -->  
    <!-- vue3可以放兄弟节点 -->
    <div>
        <input type="text" v-model="obj.mytext">
        <button @click="handClick">add</button>
        <ul>
            <li v-for="data in obj.datalist" :key="data">
                {{ data }}
            </li>
        </ul>
    </div>
</template>
<script>
import {reactive} from 'vue';
export default {
    setup() {
       const obj=reactive({
        mytext:"",
        datalist:[]
       }) 

       const handClick=()=>{
        obj.datalist.push(obj.mytext)
        obj.mytext=""
       }

       return {
        obj,handClick
       }
    },
}
</script>