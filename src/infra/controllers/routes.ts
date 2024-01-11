import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { verifyJWT } from "../middlewares/verify-jwt";
import { resource } from "./resource";
import { fetchUsers } from "./fetch-users";
import { deleteUser } from "./delete-user";
import { updateUser } from "./update-user";

export async function usersRoutes(app: FastifyInstance) {
    app.get('/users', fetchUsers)
    app.post('/register', register)
    app.post('/auth', authenticate)
    app.delete('/delete-user/:id', deleteUser)
    app.put('/update-user/:id', updateUser)
    
    // Protected Routes
    app.get('/resource', {onRequest: [ verifyJWT ]}, resource)
}