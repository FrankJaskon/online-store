export interface Device {
    id?: number
    name: string
    price: number
    typeId: number
    brandId: number
    rating?: number
    img?: File
    info?: Info[]
}

export interface User {
    id: number
    email: string
    token: string
    role: 'ADMIN' | 'USER'
}

export interface TypeOrBrand {
    id: number
    name: string
}

export interface Info {
    id?: number
    title: string
    description: string
}

export interface Filter {
    key: 'name' | 'price' | 'rating',
    order: 'ASC' | 'DESC'
}