<template>
    <div>
        <ul>
            <li v-for="data in obj.data" :key="data">
                {{ data }}
            </li>
        </ul>
    </div>
</template>
<script>
import {onMounted, reactive} from 'vue'
export default {
    setup() {
        const obj =reactive({
            data:[]
        })

        onMounted(() => { 
            setTimeout(()=>{
                obj.data=['aaa','ccc','dddd']
            },2000)
        })

        return {
            obj
        }
    }
}
</script>