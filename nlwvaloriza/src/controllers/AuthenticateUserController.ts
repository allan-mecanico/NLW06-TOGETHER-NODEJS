import { Request, Response } from "express";
import { AuthenticationUserService } from "../services/AuthenticateUserService";



class AuthenticateUserController {

	async handle(request: Request, response: Response){
        const { email, password } = request.body
        
        const authenticationUserService = new AuthenticationUserService();

        const token = await authenticationUserService.execute({
            email,
            password
        });
        
        return response.json(token)
    }
}

export { AuthenticateUserController }