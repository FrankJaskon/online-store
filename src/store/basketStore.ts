import { makeAutoObservable } from 'mobx'
import { Device } from './types'

export interface BasketDevice extends Device {
    count: number
}

export default class BasketStore {
    // State
    _devices: BasketDevice[] = []
    // _loading: boolean = false
    _totalCount: number = 0

    // Subscription on changes
    constructor() {
        makeAutoObservable( this )
    }

    // Actions
    setBasketDevices( devices: BasketDevice[], basketDevices: any ) {
        for ( let i = 0; i < basketDevices.length; i++ ) {
            for ( let j = 0; j < devices.length; j++ ) {
                if ( basketDevices[ i ].deviceId === devices[ j ].id ) {
                    devices[ j ].count = basketDevices[ i ].count
                }
            }
        }
        this._devices = devices
    }
    // setLoading( value: boolean ) {
    //     this._loading = value
    // }
    setTotalCount( value: number ) {
        this._totalCount = value
    }
    setDeviceCount( id: number, value: number ) {
        this._devices = this._devices.map( d => {
            if ( d.id === id ) {
                return { ...d, count: value }
            }
            return d
        })
    }
    // Getter changed value
    get basketDevices() {
        return this._devices
    }
    // get loading() {
    //     return this._loading
    // }
    get totalCount() {
        return this._totalCount
    }
    getBasketDevice( id: number ) {
        return this._devices.filter( d => d.id === id)[ 0 ]
    }
    removeBasketDevice( id: number ) {
        this._devices = this._devices.filter( d => d.id !== id )
        this.setTotalCount( this._totalCount - 1 )
    }
}