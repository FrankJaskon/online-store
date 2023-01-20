import { $authHost, $host } from '.'

export const createType = async ( type: string ) => {
    try {
        const { data } = await $authHost.post( 'api/type', { name: type } )
        return data
    } catch( e: any ) {
        console.error( e.message )
        return { error: true, message: e.response.data.message }
    }
}

export const fetchTypes = async () => {
    try {
        const { data } = await $host.get( 'api/type' )
        return data
    } catch( e: any ) {
        console.error( e.message )
    }
}

export const createBrand = async ( brand: string ) => {
    try {
        const { data } = await $authHost.post( 'api/brand', { name: brand } )
        return data
    } catch( e: any ) {
        console.error( e.message )
        return { error: true, message: e.response.data.message }
    }
}

export const fetchBrands = async () => {
    try {
        const { data } = await $host.get( 'api/brand' )
        return data
    } catch( e: any ) {
        console.error( e.message )
    }
}

export const createDevice = async ( device: FormData ) => {
    try {
        const { data } = await $authHost.post( 'api/device', device )
        return data
    } catch( e: any ) {
        console.error( e.message )
        return { error: true, message: e.response.data.message }
    }
}

export const updateDevice = async ( device: FormData, id: number ) => {
    try {
        const { data } = await $authHost.put( 'api/device/' + id, device )
        return data
    } catch( e: any ) {
        console.error( e.message )
        return { error: true, message: e.response.data.message }
    }
}

export const fetchDevices = async (
    typeId: number | undefined = undefined,
    brandId: number | undefined = undefined,
    page: number,
    limit: number ) => {
    try {
        const { data } = await $host.get(
            'api/device', {
                params: {
                    typeId,
                    brandId,
                    page,
                    limit,
            }})
        return data
    } catch( e: any ) {
        console.error( e.message )
    }
}

export const fetchOneDevice = async ( id: number ) => {
    try {
        const { data } = await $host.get( 'api/device/' + id )
        return data
    } catch( e: any ) {
        console.error( e.message )
    }
}

export const createRating = async ( grade: number, deviceId: number ) => {
    try {
        const { data } = await $authHost.post( 'api/rating', { grade, deviceId })
        return data
    } catch( e: any ) {
        console.error( e.message )
        return { error: true, message: e.response.data.message }
    }
}