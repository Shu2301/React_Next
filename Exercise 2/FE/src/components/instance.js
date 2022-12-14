import axios from 'axios'

const instance = axios.create({
    baseURL: "http://localhost:2301/"
})

export default instance