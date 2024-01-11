import { User } from "@/domain/enterprise/entities/user";
import { UsersRepository } from "../repositories/users-repository";

export class FetchUsersUseCase {
    constructor(
        private usersRepository: UsersRepository
    ) {}

    async execute(): Promise<User[]> {
        const user = await this.usersRepository.fetchAllUsers()

        return user
    }
}