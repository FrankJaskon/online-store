import { makeAutoObservable } from 'mobx'

export default class UserStore {
    // State
    _isAuth: boolean = false
    _user: any = {}

    // Subscription on changes
    constructor() {
        makeAutoObservable( this )
    }

    // Actions
    setIsAuth( value: boolean ) {
        this._isAuth = value
    }
    setUser( user: any ) {
        this._user = user
    }
    // Getter changed value
    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
}