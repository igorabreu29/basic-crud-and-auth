import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository"
import { createUserInstance } from "../utils/create-user"
import { DeleteUserUseCase } from "./delete-user"

let usersRepository: InMemoryUsersRepository
let sut: DeleteUserUseCase

describe('Delete User Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new DeleteUserUseCase(usersRepository)
    })

    it('should be able to delete user', async () => {
        const createUser = await createUserInstance()
        await usersRepository.create(createUser)

        const { message } = await sut.execute({
            id: createUser.id.toString()
        })

        expect(message).toEqual('User deleted with success!')
    })

    it('should not be able to delete user not existing', async () => {
        await expect(async () => {
            await sut.execute({
                id: 'user-not-existing'
            })
        }).rejects.toBeInstanceOf(Error)
    })
})