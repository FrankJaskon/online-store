import axios, { AxiosRequestConfig } from 'axios'
import { config } from 'process'

const $host = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

const $authHost = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

const authInterceptor = ( config: any ) => {
    config.headers.authorization = `Bear ${ localStorage.getItem( 'token' ) }`
    return config
}

$authHost.interceptors.request.use( authInterceptor )

export {
    $host,
    $authHost,
}