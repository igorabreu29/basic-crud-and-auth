import { FastifyReply, FastifyRequest } from "fastify";

export async function resource(req: FastifyRequest, res: FastifyReply) {
    return res.status(200).send(true)
}