import { UpdateUserUseCaseRequest, UpdateUserUseCaseResponse } from "@/types/user-use-cases-types.ts";
import { UsersRepository } from "../repositories/users-repository.ts";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.ts";
import { ConflictBetweenBirthAndAgeError } from "../errors/conflict-between-birth-and-age-error.ts";
import bcryptjs from "bcryptjs";

export class UpdateUserUseCase {
    constructor(
        private usersRepository: UsersRepository
    ) {}

    async execute({ user, id }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
        const findUserById = await this.usersRepository.findById(id) 

        if (!findUserById) {
            throw new ResourceNotFoundError()
        }

        const updateUser = {
            ...user,
            parents: {
                father: user.father,
                mother: user.mother
            },
            passwordHash: await bcryptjs.hash(user.password, 6)
        }

        const updatedUser = await this.usersRepository.updateUser(updateUser, id)

        if (!updatedUser.age) {
            throw new ConflictBetweenBirthAndAgeError()
        }

        return {
            user: updatedUser
        }
    }
}