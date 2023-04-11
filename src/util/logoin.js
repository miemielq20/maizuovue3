import axios from 'axios'
let HTTP = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000,
})

export default HTTP