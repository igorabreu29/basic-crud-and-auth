import { UpdateUserUseCase } from "@/domain/app/use-cases/update-user";
import { PrismaUsersRepository } from "../repositories/prisma-users-repository";

export function makeUpdateUserUseCase() {
    const usersRepository = new PrismaUsersRepository()
    return new UpdateUserUseCase(usersRepository)
}