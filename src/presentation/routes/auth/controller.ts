import { Request, Response } from "express";
import { CustomError, LoginUserDto, RegisterUserDto } from "../../../domain";
import { AuthService } from "../../services/auth.service";

export class AuthController {

    constructor(
        public readonly authService: AuthService,
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    register = async (req: Request, res: Response) => {
        const [error, registerDto] = RegisterUserDto.create(req.body);
        if (error) {
            return res.status(400).json({ error });
        }
        this.authService.register(registerDto!)
            .then((user) => { res.json(user); })
            .catch((error) => { this.handleError(error, res); });
    }

    login = async (req: Request, res: Response) => {
        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if (error) return res.status(400).json({ error })


        this.authService.login(loginUserDto!)
            .then((user) => res.json(user))
            .catch(error => this.handleError(error, res));
    }

    validateEmail = async (req: Request, res: Response) => {
        const { token } = req.query;
        this.authService.validateEmail(token as string)
            .then(() => res.json('Email validated'))
            .catch(error => this.handleError(error, res));
    }


}