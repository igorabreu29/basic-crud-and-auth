import { UsersRepository } from "@/domain/app/repositories/users-repository";
import { User } from "@/domain/enterprise/entities/user";

export class InMemoryUsersRepository implements UsersRepository {
    public users: User[] = []

    async findByEmail(email: string) {
        const user = this.users.find(user => user.email === email) 

        if (!user) {
            return null
        }

        return user
    }

    async findById(id: string){
        const user = this.users.find(user => user.id.toString() === id)

        if (!user) {
            return null
        }

        return user
    }

    async create(data: User) {
        this.users.push(data)

        return data
    }

    async updateUser(data: Omit<User, 'id' | 'createdAt'>, id: string) {
        const userIndex = this.users.findIndex(user => user.id.toString() === id)

        this.users[userIndex].address = data.address
        this.users[userIndex].age = data.age
        this.users[userIndex].gender = data.gender
        this.users[userIndex].birth = data.birth
        this.users[userIndex].email = data.email
        this.users[userIndex].name = data.name
        this.users[userIndex].parents = data.parents
        this.users[userIndex].lastname = data.lastname
        this.users[userIndex].passwordHash = data.passwordHash

        return this.users[userIndex]
    }

    async fetchAllUsers() {
        return this.users
    }

    async deleteUser(id: string) {
        const userIndex = this.users.findIndex(user => user.id.toString() === id)

        this.users.splice(userIndex, 1)
    }
}