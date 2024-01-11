import { UniqueEntityId } from "@/core/unique-entity-id"

export interface Parents {
    father: string,
    mother: string
}

export type Gender = 'male' | 'female'

export interface UserProps {
    name: string
    lastname: string
    age: number | undefined
    address: string
    birth: string
    parents: Parents
    gender: Gender
    email: string
    passwordHash: string
    createdAt?: Date
}

export class User {
    private _id: UniqueEntityId
    private _name: string
    private _lastname: string
    private _age: number | undefined
    private _address: string
    private _birth: string
    private _parents: Parents
    private _gender: Gender
    private _email: string
    private _passwordHash: string
    private _createdAt?: Date

    private constructor(props: UserProps, id?: UniqueEntityId) {
        this._id = id ?? new UniqueEntityId()
        this._name = props.name
        this._lastname = props.lastname
        this._age = props.age
        this._gender = props.gender
        this._birth = props.birth
        this._address = props.address
        this._parents = props.parents
        this._email = props.email
        this._passwordHash = props.passwordHash
        this._createdAt = props.createdAt ?? new Date()
    }

    get id() {
        return this._id
    }
    get name() {
        return this._name
    }
    get email() {
        return this._email
    }
    get passwordHash() {
        return this._passwordHash
    }
    get lastname() {
        return this._lastname
    }
    get age() {
        const yearUser = Number(this._birth.substring(6))
        const dayUser = Number(this._birth.substring(0, 2))
        const monthUser = Number(this._birth.substring(3, 5))

        const birthUser = new Date(yearUser, monthUser, dayUser)
        const currentDate = new Date()

        const difference = currentDate.getTime() - birthUser.getTime()
        const currentAge = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25))

        if (currentAge !== this._age) {
            return undefined
        }

        return currentAge
    }
    get gender() {
        return this._gender
    }
    get birth() {
        return this._birth
    }
    get address() {
        return this._address
    }
    get parents() {
        return this._parents
    }
    get createdAt() {
        return this._createdAt
    }

    set name(name) {
        this._name = name
    }
    set email(email) {
        this._email = email
    }
    set passwordHash(hash) {
        this._passwordHash = hash
    }
    set lastname(lastname) {
        this._lastname = lastname
    }
    set age(age) {
        this._age = age
    }
    set gender(gender) {
        this._gender = gender
    }
    set birth(birth) {
        this._birth = birth
    }
    set address(address) {
        this._address = address
    }
    set parents(parents) {
        this._parents = parents
    }

    static create(props: UserProps, id?: UniqueEntityId) {
        return new User(props, id)
    }
}

// const user = User.create({
//     name: 'John',
//     lastname: 'Doe',
//     gender: "male",
//     birth: '29/01/2006',
//     address: 'Rua Desconhecida',
//     age: 22,
//     parents: {
//         father: 'João Doe',
//         mother: 'Joana Doe',
//     },
//     email: 'john@john.com',
//     passwordHash: '202020'
// })

// console.log(user.age)