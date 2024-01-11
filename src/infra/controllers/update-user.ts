import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeUpdateUserUseCase } from "../factories/make-update-user-use-case";
import { ResourceNotFoundError } from "@/domain/app/errors/resource-not-found-error";
import { ConflictBetweenBirthAndAgeError } from "@/domain/app/errors/conflict-between-birth-and-age-error";

export async function updateUser(req: FastifyRequest, res: FastifyReply) {
    const updateParamsSchema = z.object({
        id: z.string()
    })

    const { id } = updateParamsSchema.parse(req.params)

    const updateBodySchema = z.object({
        name: z.string(),
        lastname: z.string(),
        age: z.number(),
        address: z.string(),
        birth: z.string(),
        gender: z.enum(['masculino', 'feminíno']),
        father: z.string(),
        mother: z.string(),
        email: z.string().email('Invalid email.'),
        password: z.string().min(6, 'The password cannot be less that 6').max(12)
    })

    const data = updateBodySchema.parse(req.body)

    try {
        const useCase = makeUpdateUserUseCase()

        const { user } = await useCase.execute({user: data, id})

        return res.status(200)
            .send({
                user: {
                    id: user.id.toString(),
                    name: user.name,
                    lastname: user.lastname,
                    age: user.age ,
                    address: user.address,
                    birth: user.birth,
                    gender: user.gender,
                    father: user.parents.father,
                    mother: user.parents.mother,
                    email: user.email,
                    password: user.passwordHash
                }
            })

    } catch(err) {
        if (err instanceof ResourceNotFoundError) {
            return res.status(404).send({ message: err.message })
        }

        if (err instanceof ConflictBetweenBirthAndAgeError) {
            return res.status(409).send({ message: err.message })
        }

        throw err
    }
}