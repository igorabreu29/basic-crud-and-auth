import { User } from "@/domain/enterprise/entities/user"

export interface UsersRepository {
    findByEmail: (email: string) => Promise<User | null>
    findById: (id: string) => Promise<User | null>
    create: (data: User) => Promise<User>
    updateUser: (data: Omit<User, 'id' | 'createdAt'>, id: string) => Promise<User>
    fetchAllUsers: () => Promise<User[]>
    deleteUser: (id: string) => Promise<void>
}
