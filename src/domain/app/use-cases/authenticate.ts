import { AuthenticateUseCaseRequest, AuthenticateUseCaseResponse } from "@/types/user-use-cases-types";
import { UsersRepository } from "../repositories/users-repository";
import bcryptjs from "bcryptjs";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

export class AuthenticateUseCase {
    constructor(
        private usersRepository: UsersRepository
    ) {}

    async execute({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        let user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new InvalidCredentialsError()
        } 

        const isPasswordValid = await bcryptjs.compare(password, user.passwordHash)

        if (!isPasswordValid) {
            throw new InvalidCredentialsError()
        }

        return {
            user
        }
    }
}