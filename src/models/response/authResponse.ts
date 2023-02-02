import { User } from '../../store/types'

export interface AuthData {
    accessToken: string
    refreshToken: string
    user: User
}