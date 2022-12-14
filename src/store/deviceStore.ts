import { makeAutoObservable } from 'mobx'
import { Device, TypeOrBrand } from './types'

export default class DeviceStore {
    // State
    _types: TypeOrBrand[] = [
        { id: 1, name: 'Tables' }, { id: 2, name: 'Chairs' },
        { id: 3, name: 'Tables and Chairs' }, { id: 4, name: 'Chairs and Tables' },
    ]
    _brands: TypeOrBrand[] = [
        { id: 1, name: 'Apple' }, { id: 2, name: 'Samsung' },
        { id: 6, name: 'Lenovo' }, { id:7, name: 'Asus' },
    ]
    _devices: Device[] = [
        { id: 1, name: 'Chair', price: '2000', rating: 10, img: 'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcTJFaVVfHhnZrdAlFPPstrU-LvlsTyBmT8uptShiI2s17ELAzaifmZHX8hhn1Uy-GyeUf0V8RE1gUBe7EYWx8E' },
        { id: 2, name: 'Chair', price: '2000', rating: 10, img: 'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcTJFaVVfHhnZrdAlFPPstrU-LvlsTyBmT8uptShiI2s17ELAzaifmZHX8hhn1Uy-GyeUf0V8RE1gUBe7EYWx8E' },
        { id: 3, name: 'Chair', price: '2000', rating: 10, img: 'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcTJFaVVfHhnZrdAlFPPstrU-LvlsTyBmT8uptShiI2s17ELAzaifmZHX8hhn1Uy-GyeUf0V8RE1gUBe7EYWx8E' },
        { id: 4, name: 'Chair', price: '2000', rating: 10, img: 'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcTJFaVVfHhnZrdAlFPPstrU-LvlsTyBmT8uptShiI2s17ELAzaifmZHX8hhn1Uy-GyeUf0V8RE1gUBe7EYWx8E' },
        { id: 5, name: 'Chair', price: '2000', rating: 10, img: 'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcTJFaVVfHhnZrdAlFPPstrU-LvlsTyBmT8uptShiI2s17ELAzaifmZHX8hhn1Uy-GyeUf0V8RE1gUBe7EYWx8E' },
        { id: 6, name: 'Chair', price: '2000', rating: 10, img: 'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcTJFaVVfHhnZrdAlFPPstrU-LvlsTyBmT8uptShiI2s17ELAzaifmZHX8hhn1Uy-GyeUf0V8RE1gUBe7EYWx8E' },
        { id: 7, name: 'Chair', price: '2000', rating: 10, img: 'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcTJFaVVfHhnZrdAlFPPstrU-LvlsTyBmT8uptShiI2s17ELAzaifmZHX8hhn1Uy-GyeUf0V8RE1gUBe7EYWx8E' },
        { id: 8, name: 'Chair', price: '2000', rating: 10, img: 'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcTJFaVVfHhnZrdAlFPPstrU-LvlsTyBmT8uptShiI2s17ELAzaifmZHX8hhn1Uy-GyeUf0V8RE1gUBe7EYWx8E' },
        { id: 9, name: 'Chair', price: '2000', rating: 10, img: 'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcTJFaVVfHhnZrdAlFPPstrU-LvlsTyBmT8uptShiI2s17ELAzaifmZHX8hhn1Uy-GyeUf0V8RE1gUBe7EYWx8E' },
        { id: 10, name: 'Chair', price: '2000', rating: 10, img: 'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcTJFaVVfHhnZrdAlFPPstrU-LvlsTyBmT8uptShiI2s17ELAzaifmZHX8hhn1Uy-GyeUf0V8RE1gUBe7EYWx8E' },
    ]
    _selectedType: TypeOrBrand = { id: 0, name: '' }
    _selectedBrand: TypeOrBrand = { id: 0, name: '' }

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
}