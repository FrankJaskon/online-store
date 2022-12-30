import { makeAutoObservable } from 'mobx'
import { Device } from './types'

export default class BasketStore {
    // State
    _devices: Device[] = []
    // _loading: boolean = false
    _totalCount: number = 0

    // Subscription on changes
    constructor() {
        makeAutoObservable( this )
    }

    // Actions
    setBasketDevices( devices: Device[] ) {
        this._devices = devices
    }
    // setLoading( value: boolean ) {
    //     this._loading = value
    // }
    setTotalCount( value: number ) {
        this._totalCount = value
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
}