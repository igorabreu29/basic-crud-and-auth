import { RegisterUseCase } from "@/domain/app/use-cases/register";
import { PrismaUsersRepository } from "@/infra/repositories/prisma-users-repository";

export function makeRegisterUseCase() {
    const usersRepository = new PrismaUsersRepository()
    return new RegisterUseCase(usersRepository)
}