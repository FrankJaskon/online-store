import axios, { AxiosResponse } from 'axios'
import { $host } from '../http'
import { AuthData } from '../models/response/authResponse'
import { LogoutData } from '../models/response/logoutResponse'

export default class authService {
    static async login( email: string, password: string ): Promise<AxiosResponse<AuthData>> {
           return $host.post<AuthData>( 'api/user/login', { email, password })
    }
    static async registration( email: string, password: string ): Promise<AxiosResponse<AuthData>> {
        return $host.post<AuthData>( 'api/user/registration', { email, password })
    }
    static async logout(): Promise<AxiosResponse<LogoutData>> {
        return $host.post<LogoutData>( 'api/user/logout' )
    }
    static async check(): Promise<AxiosResponse<AuthData>> {
        return $host.get<AuthData>( 'api/user/refresh' )
    }
}