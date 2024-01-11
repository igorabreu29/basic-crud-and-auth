import { GetUserProfileUseCase } from "@/domain/app/use-cases/get-user-profile";
import { PrismaUsersRepository } from "@/infra/repositories/prisma-users-repository";

export function makeGetUserProfileUseCase() {
    const usersRepository = new PrismaUsersRepository()
    return new GetUserProfileUseCase(usersRepository)
}