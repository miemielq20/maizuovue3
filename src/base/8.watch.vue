<template>
    <div>
        <input type="text" v-model="obj.text">
        <ul>
            <li v-for="item of obj.datalist" :key="item"  >
                {{item}}
            </li>
        </ul>
    </div>
</template>
<script>
import { reactive ,watch} from 'vue'
export default {
    setup() {
        const obj=reactive({
            datalist:[
                'aaaa',
                'bbbbb',
                'cccc',
                'aad',
                'dcc',
                'dfc',
                'ddd'
            ],
            oldlist:[
                'aaaa',
                'bbbbb',
                'cccc',
                'aad',
                'dcc',
                'dfc',
                'ddd'
            ],
            text: ""
        })

        watch(()=>obj.text,()=>{
            obj.datalist=obj.oldlist.filter((item) => {
                    return item.includes(obj.text)
                })
        })
      
        return {
        obj
        }
    },
}
</script>