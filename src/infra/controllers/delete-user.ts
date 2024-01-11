import { ResourceNotFoundError } from "@/domain/app/errors/resource-not-found-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeDeleteUserUseCase } from "../factories/make-delete-user-use-case";
import { z } from "zod";

export async function deleteUser(req: FastifyRequest, res: FastifyReply) {
    const deleteParamsSchema = z.object({
        id: z.string()
    })

    const { id } = deleteParamsSchema.parse(req.params)

    try {
        const useCase = makeDeleteUserUseCase()

        const { message } = await useCase.execute({
            id,
        })

        return res
            .status(203)
            .send({ message })
    } catch(err) {
        if (err instanceof ResourceNotFoundError) {
            return res.status(404).send({ message: err.message })
        }

        throw err
    } 
}