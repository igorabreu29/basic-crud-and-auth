import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository"
import { createUserInstance } from "../utils/create-user"
import { FetchUsersUseCase } from "./fetch-users"
import { Gender, User } from "@/domain/enterprise/entities/user"
import { hash } from "bcryptjs"

let usersRepository: InMemoryUsersRepository
let sut: FetchUsersUseCase

describe('Fetch Users Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new FetchUsersUseCase(usersRepository)
    })

    it('should be able to fetch all user', async () => {
        const createUser = await createUserInstance()
        await usersRepository.create(createUser)

        const user = User.create({
            name: 'Joãozinho',
            lastname: 'Doe',
            gender: "male" as Gender,
            birth: '03/12/2002',
            address: 'Rua Desconhecida',
            age: 22,
            parents: {
                father: 'Joãozão Doe',
                mother: 'Joaninha Doe'  
            },
            email: 'joao@joao.com',
            passwordHash: await hash('joaojoao', 6),
        })
        await usersRepository.create(user)

        const users = await sut.execute()

        expect(users).toEqual(expect.objectContaining([
            expect.objectContaining({
                id: {
                    value: expect.any(String)
                },
                name: 'John',
                lastname: 'Doe',
                email: 'john@john.com'
            }),
            expect.objectContaining({
                id: {
                    value: expect.any(String)
                },
                name: 'Joãozinho',
                lastname: 'Doe',
                email: 'joao@joao.com'
            }),
        ]))
    })
})