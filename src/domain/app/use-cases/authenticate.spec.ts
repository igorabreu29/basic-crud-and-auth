import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository"
import { AuthenticateUseCase } from "./authenticate"
import { createUserInstance } from "../utils/create-user"

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new AuthenticateUseCase(usersRepository)
    })

    it('should be able to authenticate user', async () => {
        const createUser = await createUserInstance()
        await usersRepository.create(createUser)

        const { user } = await sut.execute({
            email: 'john@john.com',
            password: "johnjohn"
        })

        expect(user).toEqual(expect.objectContaining({
            id: {
                value: expect.any(String)
            },
            name: 'John',
            email: 'john@john.com',
        }))
    })

    it('should not be able to authenticate user with different email', async () => {
        const createUser = await createUserInstance()
        await usersRepository.create(createUser)

        await expect(async () => {
            await sut.execute({
                email: 'john@invalid.com',
                password: "johnjohn"
            })
        }).rejects.toBeInstanceOf(Error)
    })

    it('should not be able to authenticate user with different password', async () => {
        const createUser = await createUserInstance()
        await usersRepository.create(createUser)

        await expect(async () => {
            await sut.execute({
                email: 'john@john.com',
                password: "user-not-existing"
            })
        }).rejects.toBeInstanceOf(Error)
    })
})