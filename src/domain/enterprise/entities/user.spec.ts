import { defaultDateMock } from "@/infra/utils/default-date"
import { User } from "./user"

describe('User entity', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to create user instance and receive createdAt & id props', () => {
        defaultDateMock()

        const user = User.create({
            name: 'John',
            lastname: 'Doe',
            gender: "male",
            birth: '14/04/2001',
            address: 'Rua Desconhecida',
            age: 21,
            parents: {
                father: 'João Doe',
                mother: 'Joana Doe',
            },
            email: 'john@john.com',
            passwordHash: '202020'
        })  

        expect(user.createdAt).toBeTruthy()
        expect(user.id).toBeTruthy()
        expect(user).toEqual(expect.objectContaining({
            id: {
                value: expect.any(String)
            },
            createdAt: new Date(2023, 1, 5, 14)
        }))
    })

    it('should be able to recieve undefined with invalid age', () => {
        defaultDateMock()

        const user = User.create({
            name: 'John',
            lastname: 'Doe',
            gender: "male",
            birth: '14/04/2001',
            address: 'Rua Desconhecida',
            age: 23,
            parents: {
                father: 'João Doe',
                mother: 'Joana Doe',
            },
            email: 'john@john.com',
            passwordHash: '202020'
        })  

        expect(user.age).toBeUndefined()
    })
})