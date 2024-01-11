import { UsersRepository } from "@/domain/app/repositories/users-repository";
import { UniqueEntityId } from "@/core/unique-entity-id";
import {  Gender, User } from "@/domain/enterprise/entities/user";
import { prisma } from "@/lib/prisma";
import { User as UserType } from '@prisma/client'

export class PrismaUsersRepository implements UsersRepository {
    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            return null
        }

        const userEntity = createUserInstanceEntity(user)

        return userEntity
    }

    async findById(id: string) {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        if (!user) return null

        const userEntity = createUserInstanceEntity(user)

        return userEntity
    }

    async create(data: User) {
        const user = await prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                lastname: data.lastname,
                password: data.passwordHash,
                gender: data.gender,
                address: data.address,
                birth: data.birth,
                age: data.age as number,
                father: data.parents.father,
                mother: data.parents.mother,
            }
        })

        const userEntity = createUserInstanceEntity(user)

        return userEntity
    }

    async updateUser(data: Omit<User, "id" | "createdAt">, id: string) {
        const user = await prisma.user.update({
            where: {
                id
            },

            data: {
                address: data.address,
                age: data.age,
                birth: data.birth,
                email: data.email,
                father: data.parents.father,
                mother: data.parents.mother,
                gender: data.gender,
                lastname: data.lastname,
                name: data.name,
                password: data.passwordHash
            }
        })

        const updatedUser = createUserInstanceEntity(user)

        return updatedUser
    }

    async fetchAllUsers() {
        const users = await prisma.user.findMany()

        const allUsers = users.map(user => createUserInstanceEntity(user))
        return allUsers
    }

    async deleteUser(id: string) {
        await prisma.user.delete({
            where: {
                id
            }
        })
    }
}

function createUserInstanceEntity(user: UserType): User {
    return User.create({
        name: user.name,
        lastname: user.lastname,
        gender: user.gender as Gender,
        birth: user.birth,
        address: user.address,
        age: user.age,
        parents: {
          father: user.father,
          mother: user.mother  
        },
        email: user.email,
        passwordHash: user.password,
    }, new UniqueEntityId(user.id))
}