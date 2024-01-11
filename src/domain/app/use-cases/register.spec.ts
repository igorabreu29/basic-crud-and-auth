import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository"
import { RegisterUseCase } from "./register"
import { Gender } from "@/domain/enterprise/entities/user"
import { UserAlreadyExistError } from "../errors/user-already-exit-error"
import { ConflictBetweenBirthAndAgeError } from "../errors/conflict-between-birth-and-age-error"
import { defaultDateMock } from "@/infra/utils/default-date"

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new RegisterUseCase(usersRepository)
        
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to register a new user', async () => {
        const mockDate = new Date(2023, 1, 5, 14) // 05/01/2003, 14hrs
        vi.setSystemTime(mockDate)

        const data = {
            name: 'John',
            lastname: 'Doe',
            gender: "male" as Gender,
            birth: '29/02/2001',
            address: 'Rua Desconhecida',
            age: 21,
            father: 'João Doe',
            mother: 'Joana Doe',
            email: 'john@john.com',
            password: 'johndoe',
        }

        const { user } = await sut.execute(data)

        expect(user.id).toBeTruthy()
        expect(user).toEqual(
            expect.objectContaining({
                name: 'John',
                lastname: 'Doe',
                gender: "male",
                birth: '29/02/2001',
                address: 'Rua Desconhecida',
                age: 21,
                parents: {
                    father: 'João Doe',
                    mother: 'Joana Doe', 
                },
                email: 'john@john.com',
            })
        )
    })

    it('should not be able to register a user who already exist', async () => {
        const data = {
            name: 'John',
            lastname: 'Doe',
            gender: "male" as Gender,
            birth: '29/02/2001',
            address: 'Rua Desconhecida',
            age: 22,
            father: 'João Doe',
            mother: 'Joana Doe', 
            email: 'john@john.com',
            password: 'johndoe',
        }

        await sut.execute(data) 

        await expect(async () => {
            await sut.execute(data)
        }).rejects.toBeInstanceOf(UserAlreadyExistError)
    })

    it ('should not be able to register user with invalid age', async () => {
        defaultDateMock()

        const data = {
            name: 'John',
            lastname: 'Doe',
            gender: "male" as Gender,
            birth: '29/02/2001',
            address: 'Rua Desconhecida',
            age: 22,
            father: 'João Doe',
            mother: 'Joana Doe',
            email: 'john@john.com',
            password: 'johndoe',
        }

        await expect(async () => {
            await sut.execute(data)
        }).rejects.toBeInstanceOf(ConflictBetweenBirthAndAgeError)
    })
})