import { makeAutoObservable } from 'mobx'
import { Device, TypeOrBrand } from './types'

export default class DeviceStore {
    // State
    _types: TypeOrBrand[] = []
    _brands: TypeOrBrand[] = []
    _devices: Device[] = []
    _selectedType: TypeOrBrand = {} as TypeOrBrand
    _selectedBrand: TypeOrBrand = {} as TypeOrBrand
    _loading: boolean = false
    _page: number = 1
    _totalCount: number = 0
    _limit: number = 20

    // Subscription on changes
    constructor() {
        makeAutoObservable( this )
    }

    // Actions
    setType( types: TypeOrBrand[] ) {
        this._types = types
    }
    setBrand( brands: TypeOrBrand[] ) {
        this._brands = brands
    }
    setDevices( devices: Device[] ) {
        this._devices = devices
    }
    setSelectedType( type: TypeOrBrand ) {
        this._selectedType = type
    }
    setSelectedBrand( brand: TypeOrBrand ) {
        this._selectedBrand = brand
    }
    setLoading( value: boolean ) {
        this._loading = value
    }
    setPage( value: number ) {
        this._page = value
    }
    setLimit( value: number ) {
        this._limit = value
    }
    setTotalCount( value: number ) {
        this._totalCount = value
    }
    // Getter changed value
    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }
    get devices() {
        return this._devices
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }
    get loading() {
        return this._loading
    }
    get page() {
        return this._page
    }
    get totalCount() {
        return this._totalCount
    }
    get limit() {
        return this._limit
    }
}