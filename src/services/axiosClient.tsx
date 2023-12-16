import axios from 'axios'
import https from 'https'
export const baseURL = 'https://localhost:7264/api'
const axiosClient = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
    },
    timeout: 10000,
    httpsAgent: new https.Agent({
        rejectUnauthorized: false,
    }),
})

// axiosClient.interceptors.request.use(
//     function (config) {
//         return config
//     },
//     function (error) {
//         return Promise.reject(error)
//     },
// )

// axiosClient.interceptors.response.use(
//     function (response) {
//         return response
//     },
//     function (error) {
//         return Promise.reject(error)
//     },
// )
export default axiosClient
