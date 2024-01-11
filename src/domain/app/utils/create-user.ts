import { Gender, User } from "@/domain/enterprise/entities/user";
import { hash } from "bcryptjs";

export async function createUserInstance() {
    return User.create({
        name: 'John',
        lastname: 'Doe',
        gender: "masculino" as Gender,
        birth: '29/01/2001',
        address: 'Rua Desconhecida',
        age: 22,
        parents: {
          father: 'João Doe',
          mother: 'Joana Doe'  
        },
        email: 'john@john.com',
        passwordHash: await hash('johnjohn', 6),
    })
}