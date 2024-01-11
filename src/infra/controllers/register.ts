import { UserAlreadyExistError } from "@/domain/app/errors/user-already-exit-error";
import { makeRegisterUseCase } from "@/infra/factories/make-register-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(req: FastifyRequest, res: FastifyReply) {
    const registerSchema = z.object({
        name: z.string(),
        lastname: z.string(),
        age: z.number(),
        address: z.string(),
        birth: z.string(),
        gender: z.enum(['male', 'female']),
        father: z.string(),
        mother: z.string(),
        email: z.string().email('Invalid email.'),
        password: z.string().min(6, 'The password cannot be less that 6').max(12)
    })

    const { name, email, password, address, age, birth, father, mother, gender, lastname } = registerSchema.parse(req.body)

    try {
        const useCase = makeRegisterUseCase()

        const { user } = await useCase.execute({
            name,
            email,
            password,
            address,
            age,
            birth,
            father,
            mother,
            gender,
            lastname
        })

        return res
        .status(201)
        .send({
            user: {
                id: user.id.toString(),
                name: user.name,
                email: user.email,
                password: null,
                createdAt: user.createdAt
            }
        })
    } catch(err) {
        if (err instanceof UserAlreadyExistError) {
            return res.status(409).send({ message: err.message })
        }

        throw err
    }
}