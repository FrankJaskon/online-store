import authService from '../services/authService'

export interface FormError {
    error: boolean
    message: string
}

export const registration = async ( email: string, password: string ) => {
    try {
        const { data } = await authService.registration( email, password )
        localStorage.setItem( 'token', data.accessToken )
        return ( data.user )
    } catch( e: any ) {
        console.error( e.message )
        return { error: true, message: e.response.data.message } as FormError
    }
}

export const login = async ( email: string, password: string ) => {
    try {
        const { data } = await authService.login( email, password )
        localStorage.setItem( 'token', data.accessToken )
        return ( data.user )
    } catch( e: any ) {
        console.error( e.message )
        return { error: true, message: e.response.data.message } as FormError
    }
}

export const logout = async () => {
    try {
        const { status } = await authService.logout()
        localStorage.removeItem( 'token' )
        return ( status )
    } catch( e: any ) {
        console.error( e.message )
    }
}

export const check = async () => {
    try {
        const { data } = await authService.check()
        localStorage.setItem( 'token', data.accessToken )
        return data.user
    } catch( e: any ) {
        console.error( e.message )
    }
}