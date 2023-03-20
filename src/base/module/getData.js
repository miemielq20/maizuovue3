import axios from 'axios'
import {onMounted,reactive} from 'vue'

function getData(){
    const obj=reactive({
        list:[]
    })

    onMounted(() => {
        axios.get('/1.json').then(res=>{
            obj.list=res.data.list
        })
    })

    return obj
}
export {getData}