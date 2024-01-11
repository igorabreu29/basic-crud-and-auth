import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository"
import { Gender } from "@/domain/enterprise/entities/user"
import { UpdateUserUseCase } from "./update-user"
import { createUserInstance } from "../utils/create-user"
import { defaultDateMock } from "@/infra/utils/default-date"
import { ConflictBetweenBirthAndAgeError } from "../errors/conflict-between-birth-and-age-error"

let usersRepository: InMemoryUsersRepository
let sut: UpdateUserUseCase

describe('Update User Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new UpdateUserUseCase(usersRepository)
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to update user', async () => {
        defaultDateMock()

        const userData = await createUserInstance()
        const createUser = await usersRepository.create(userData)

        const data = {
            name: 'Joaninha',
            lastname: 'Nova',
            gender: "feminíno" as Gender,
            birth: '12/05/2001',
            address: 'Rua Nova',
            age: 21,
            father: 'João Nova',
            mother: 'Joana Nova',
            email: 'joana12@test.com',
            password: 'joana12',
        }

        const { user } = await sut.execute({ user: data, id: createUser.id.toString() })

        expect(user.id).toBeTruthy()
        expect(user).toEqual(
            expect.objectContaining({
                name: 'Joaninha',
                lastname: 'Nova',
                gender: "feminíno",
                birth: '12/05/2001',
                address: 'Rua Nova',
                age: 21,
                parents: {
                    father: 'João Nova',
                    mother: 'Joana Nova', 
                },
                email: 'joana12@test.com',
            })
        )
    })

    it('should not be able to update a user not existing', async () => {
        const data = {
            name: 'Joaninha',
            lastname: 'Nova',
            gender: "feminíno" as Gender,
            birth: '12/05/2001',
            address: 'Rua Nova',
            age: 23,
            father: 'João Nova',
            mother: 'Joana Nova',
            email: 'joana12@test.com',
            password: 'joana12',
        }


        await expect(async () => {
            await sut.execute({ user: data, id: 'id-not-existing' })
        }).rejects.toBeInstanceOf(Error)
    })

    it('should not be able to update user with conflict beetween age and birth', async () => {
        defaultDateMock()

        const userData = await createUserInstance()
        const createUser = await usersRepository.create(userData)

        const data = {
            name: 'Joaninha',
            lastname: 'Nova',
            gender: "feminíno" as Gender,
            birth: '12/05/2001',
            address: 'Rua Nova',
            age: 23,
            father: 'João Nova',
            mother: 'Joana Nova',
            email: 'joana12@test.com',
            password: 'joana12',
        }

        await expect(async () => {
            await sut.execute({ user: data, id: createUser.id.toString() })
        }).rejects.toBeInstanceOf(ConflictBetweenBirthAndAgeError)
    })
})