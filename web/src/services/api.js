import axios from 'axios'

const api = axios.create({
    // link para o backend
    baseURL: 'http://localhost:3333'
})

export default api