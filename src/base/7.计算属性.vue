<template>
    <div>
        <input type="text" v-model="obj.text">
        <ul>
            <li v-for="item of computedTest" :key="item">
                {{item}}
            </li>
        </ul>
    </div>
</template>
<script>
import { reactive ,computed} from 'vue'
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
            text: ""
        })

        const computedTest=computed(()=> {
                return obj.datalist.filter((item) => {
                    return item.includes(obj.text)
                })
            }
        )
      
        return {
            computedTest,obj
        }
    },
}
</script>