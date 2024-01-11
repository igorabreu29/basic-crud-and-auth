import { Gender, User } from "@/domain/enterprise/entities/user"

interface UserGlobalResponse {
    user: User
}

export interface RegisterUseCaseRequest {
    name: string
    password: string
    lastname: string
    age: number
    address: string
    birth: string
    father: string
    mother: string
    gender: Gender
    email: string
}

export interface RegisterUseCaseResponse extends UserGlobalResponse {}

export interface AuthenticateUseCaseRequest {
    email: string
    password: string
}

export interface AuthenticateUseCaseResponse extends UserGlobalResponse {}

export interface GetUserProfileUseCaseRequest {
    id: string
}

export interface GetUserProfileUseCaseResponse extends UserGlobalResponse {}

export interface DeleteUserUseCaseRequest {
    id: string
}

export interface DeleteUserUseCaseResponse {
    message: 'User deleted with success!'
}

export interface UpdateUserUseCaseRequest {
    user: {
        name: string
        password: string
        lastname: string
        age: number
        address: string
        birth: string
        father: string
        mother: string
        gender: Gender
        email: string
    },
    id: string
}

export interface UpdateUserUseCaseResponse extends UserGlobalResponse {}