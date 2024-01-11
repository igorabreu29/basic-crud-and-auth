import { Gender } from "@/enterprise/entities/user"

interface User {
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

export function defaultUserData(
    override: Partial<User> = {}
) {
    return {
        name: 'John',
        lastname: 'Doe',
        gender: "male",
        birth: '14/05/2001',
        address: 'Rua Desconhecida',
        age: 21,
        father: 'João Doe',
        mother: 'Joana Doe',
        email: 'john@john.com',
        password: '202020',
        ...override,
    }
}