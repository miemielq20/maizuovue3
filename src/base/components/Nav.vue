<template>
    <div>
        <button @click="handClick">点击</button>
        <ul>
            <li>111111</li>
            <li>111111</li>
            <li>111111</li>
            <li>111111</li>
            <li>111111</li> 
            <li>111111</li>
            <li>111111</li>
            <li>111111</li>
            <li>111111</li>
        </ul>  
    </div>
</template>
<script>
import {defineProps} from 'vue';
export default {
    props:['myname'],
    setup(props,{emit}) {
        const handClick=()=>{
            console.log(props)
            emit('event')
        }
        return {
            handClick
        }
    },
}
</script>