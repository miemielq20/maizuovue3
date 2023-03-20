<template>
    <!-- <div>55555</div> -->  
    <!-- vue3可以放兄弟节点 -->
    <div>
        <input type="text" v-model="mytext" ref="myTextRef">
        <button @click="handClick">add</button>
        <ul>
            <li v-for="data in datalist" :key="data">
                {{ data }}
            </li>
        </ul>
    </div>
</template>
<script >
import {reactive,ref} from 'vue';
export default {
    setup() {
       
       const mytext=ref(''); //对.value拦截
       const datalist=ref([]);

       const myTextRef=ref()

       const handClick=()=>{

        console.log(myTextRef.value.value) //必须写value
        
        datalist.value.push(mytext.value)
        mytext.value=""
       }

       return {
        mytext,handClick,myTextRef,datalist
       }
    },
}
</script>