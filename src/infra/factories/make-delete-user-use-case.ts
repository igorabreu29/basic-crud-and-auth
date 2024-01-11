import { DeleteUserUseCase } from "@/domain/app/use-cases/delete-user";
import { PrismaUsersRepository } from "../repositories/prisma-users-repository";

export function makeDeleteUserUseCase() {
    const usersRepository = new PrismaUsersRepository()
    return new DeleteUserUseCase(usersRepository)
}