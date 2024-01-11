import { InvalidCredentialsError } from "@/domain/app/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/infra/factories/make-authenticate-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
    const authenticateSchema = z.object({
        email: z.string().email('Invalid email.'),
        password: z.string().min(1)
    })

    const { email, password } = authenticateSchema.parse(req.body)

    try {
        const useCase = makeAuthenticateUseCase()

        const { user } = await useCase.execute({
            email,
            password
        })

        const token = await res.jwtSign(
            {
                name: user.name,
                email: user.email
            },
            {
                sign: {
                    sub: user.id.toString()
                }
            }
        )

        return res
            .status(200)
            .send({
                token
            })
    } catch(err) {
        if (err instanceof InvalidCredentialsError) {
            return res.status(400).send({message: err.message})
        }

        throw err
    }
}