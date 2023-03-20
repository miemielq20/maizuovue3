<template>
    <div>
        <ul>
            <li v-for="data in obj.list" :key="data">
                {{ data.name }}
            </li>
        </ul>
    </div>
</template>
<script>
import {getData} from '@/base/module/getData'
export default {
    setup() {
        const obj=getData()
        return {
            obj
        }
    }
}
</script>