import { DeleteUserUseCaseRequest, DeleteUserUseCaseResponse } from "@/types/user-use-cases-types";
import { UsersRepository } from "../repositories/users-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

export class DeleteUserUseCase {
    constructor(
        private usersRepository: UsersRepository
    ) {}

    async execute({ id }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
        const user = await this.usersRepository.findById(id)

        if (!user) {
            throw new ResourceNotFoundError()
        }

        await this.usersRepository.deleteUser(id)

        return {
            message: 'User deleted with success!'
        }
    }
}