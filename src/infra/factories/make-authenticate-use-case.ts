import { AuthenticateUseCase } from "@/domain/app/use-cases/authenticate";
import { PrismaUsersRepository } from "@/infra/repositories/prisma-users-repository";

export function makeAuthenticateUseCase() {
    const usersRepository = new PrismaUsersRepository()
    return new AuthenticateUseCase(usersRepository)
}