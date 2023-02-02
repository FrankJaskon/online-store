import axios, { AxiosRequestConfig } from 'axios'
import { AuthData } from '../models/response/authResponse'

const $host = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})

const $authHost = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})

const addAccessTokenToHeaderInterceptor = ( config: AxiosRequestConfig ) => {
    if ( config.headers ) {
        config.headers.authorization = `Bear ${ localStorage.getItem( 'token' ) }`
    }
    return config
}

const updateAccessTokenInterceptor = async ( error: any ) => {
    const originalRequest = error.config
    if ( error.response.status === 401 && error.config && !error.config._isRetry ) {
        error.config._isRetry = true
        try {
            const { data } = await $host.get<AuthData>( 'api/user/refresh' )
            localStorage.setItem( 'token', data.accessToken )
            return $authHost.request( originalRequest )
        } catch( e ) {
            throw e
        }
    }
}


$authHost.interceptors.request.use( addAccessTokenToHeaderInterceptor )
$authHost.interceptors.response.use( config => config, updateAccessTokenInterceptor )

export {
    $host,
    $authHost,
}