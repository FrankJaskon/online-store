import { $authHost } from '.'

export const postBasketDevice = async ( deviceId: number ) => {
    try {
        const { data } = await $authHost.post( 'api/basket', { deviceId } )
        return data
    } catch( e: any ) {
        console.error( e.message )
        return { error: true, message: e.response.data.message }
    }
}

export const fetchBasket = async () => {
    try {
        const { data } = await $authHost.get( 'api/basket' )
        return data
    } catch( e: any ) {
        console.error( e.message )
    }
}

export const incrementCount = async ( deviceId: number ) => {
    try {
        const { data } = await $authHost.patch( 'api/basket', { deviceId, increment: true })
        return data
    } catch( e: any ) {
        console.error( e.message )
    }
}

export const decrementCount = async ( deviceId: number ) => {
    try {
        const { data } = await $authHost.patch( 'api/basket', { deviceId, decrement: true })
        return data
    } catch( e: any ) {
        console.error( e.message )
    }
}

export const removeItem = async ( deviceId: number ) => {
    try {
        const { data } = await $authHost.delete( 'api/basket', { data: { deviceId }})
        return data
    } catch( e: any ) {
        console.error( e.message )
    }
}