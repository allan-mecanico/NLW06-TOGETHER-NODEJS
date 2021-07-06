import { getCustomRepository } from "typeorm" 
import { UsersRepositories } from  "../repositories/UsersRepositories";
import { compare } from "bcryptjs";

import { sign } from "jsonwebtoken"; 

interface IAuthenticationRequest {
    email: string,
    password: string;
}

class AuthenticationUserService {

	async execute({email, password} :IAuthenticationRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories)

        const user = await usersRepositories.findOne({
            email
        });
        if(!user) {
            throw new Error("Email/password incorrect")
        }

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch) {
            throw new Error("Email/Password incorrect")

        }

        const token = sign({
            email: user.email,

        }, "6b4cc61981c296c1a3be31d6873b2e9a", {
            subject : user.id,
            expiresIn: "1d"
        })
        return token;
    }

}

export { AuthenticationUserService}