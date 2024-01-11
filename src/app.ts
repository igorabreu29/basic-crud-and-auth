import { usersRoutes } from "./infra/controllers/routes";
import { env } from "./env";

import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCors from "@fastify/cors";
import { ZodError } from "zod";

export const app = fastify()

app.register(fastifyCors, {
    origin: true,
    credentials: true,
})
app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    sign: {
        expiresIn: '10m'
    },
})
app.register(usersRoutes)

app.setErrorHandler((err, _, res) => {
    if (err instanceof ZodError) {
        return res
            .status(400)
            .send({ message: err.message, issues: err.format() })
    }

    return res.status(500).send({ message: 'Internal Server Error.' })
})