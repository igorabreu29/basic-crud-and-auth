import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository"
import { GetUserProfileUseCase } from "./get-user-profile"
import { createUserInstance } from "../utils/create-user"

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new GetUserProfileUseCase(usersRepository)
    })

    it('should be able to get user', async () => {
        const createUser = await createUserInstance()
        await usersRepository.create(createUser)

        const { user } = await sut.execute({
            id: createUser.id.toString()
        })

        expect(user).toEqual(expect.objectContaining({
            id: {
                value: expect.any(String)
            },
            name: 'John',
            email: 'john@john.com',
        }))
    })

    it('should not be able to get user not existing', async () => {
        await expect(async () => {
            await sut.execute({
                id: 'user-not-existing'
            })
        }).rejects.toBeInstanceOf(Error)
    })
})