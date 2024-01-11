import { PrismaUsersRepository } from "@/infra/repositories/prisma-users-repository";
import { FetchUsersUseCase } from "@/domain/app/use-cases/fetch-users";

export function makeFetchUsersUseCase() {
    const usersRepository = new PrismaUsersRepository()
    return new FetchUsersUseCase(usersRepository)
}