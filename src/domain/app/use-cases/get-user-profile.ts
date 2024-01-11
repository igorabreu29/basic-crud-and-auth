import { GetUserProfileUseCaseRequest, GetUserProfileUseCaseResponse } from "@/types/user-use-cases-types";
import { UsersRepository } from "../repositories/users-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

export class GetUserProfileUseCase {
    constructor(
        private usersRepository: UsersRepository
    ) {}

    async execute({ id }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
        const user = await this.usersRepository.findById(id)

        if (!user) {
            throw new ResourceNotFoundError()
        }

        return {
            user
        }
    }
}