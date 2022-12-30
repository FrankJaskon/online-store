import { $authHost, $host } from '.'
import jwt_decode from 'jwt-decode'

export const registration = async ( email: string, password: string ) => {
    try {
        const { data } = await $host.post( 'api/user/registration', { email, password, role: 'ADMIN' })
        localStorage.setItem( 'token', data.token )
        return jwt_decode( data.token )
    } catch( e: any ) {
        console.error( e.message )
        return { error: true, message: e.response.data.message }
    }
}

export const login = async ( email: string, password: string ) => {
    try {
        const { data } = await $host.post( 'api/user/login', { email, password })
        localStorage.setItem( 'token', data.token )
        return jwt_decode( data.token )
    } catch( e: any ) {
        console.error( e.message )
        return { error: true, message: e.response.data.message }
    }
}

export const check = async () => {
    try {
        const { data } = await $authHost.get( 'api/user/auth' )
        localStorage.setItem( 'token', data.token )
        return jwt_decode( data.token )
    } catch( e: any ) {
        console.error( e.message )
    }
}