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

export interface TypeOrBrand {
    id: number
    name: string
}

export interface Info {
    id?: number
    title: string
    description: string
}