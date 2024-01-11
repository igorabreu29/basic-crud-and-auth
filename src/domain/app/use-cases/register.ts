import { User } from "@/domain/enterprise/entities/user.ts";
import { RegisterUseCaseRequest, RegisterUseCaseResponse } from "@/types/user-use-cases-types.ts";
import { UsersRepository } from "../repositories/users-repository.ts";
import bcryptjs from "bcryptjs";
import { UserAlreadyExistError } from "../errors/user-already-exit-error.ts";
import { ConflictBetweenBirthAndAgeError } from "../errors/conflict-between-birth-and-age-error.ts";

export class RegisterUseCase {
    constructor(
        private usersRepository: UsersRepository
    ) {}

    async execute({ name, email, password, address, age, birth, gender, lastname, father, mother }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
        let user = await this.usersRepository.findByEmail(email) 

        if (user) {
            throw new UserAlreadyExistError()
        }

        const createUser = User.create({
            email,
            name,
            address,
            age,
            birth,
            gender,
            lastname,
            parents: {
                father, 
                mother
            },
            passwordHash: await bcryptjs.hash(password, 6),
        })

        if (!createUser.age) {
            throw new ConflictBetweenBirthAndAgeError()
        }

        user = await this.usersRepository.create(createUser)

        return {
            user,
        }
    }
}