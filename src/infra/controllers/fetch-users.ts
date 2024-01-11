import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchUsersUseCase } from "../factories/make-fetch-users-use-case";

export async function fetchUsers(req: FastifyRequest, res: FastifyReply) {
    const useCase = makeFetchUsersUseCase()

    const fetchAllUsers = await useCase.execute()
    const users = fetchAllUsers.map(user => ({
        id: user.id.toString(),
        name: user.name,
        lastname: user.lastname,
        gender: user.gender,
        birth: user.birth,
        mother: user.parents.mother,
        father: user.parents.father,
        age: user.age,
        email: user.email,
        passwordHash: user.passwordHash,
        createdAt: user.createdAt,
        address: user.address
    }))

    return res.status(200).send({
        users
    })
}