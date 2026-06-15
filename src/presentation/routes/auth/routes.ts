import { Router } from "express";

import { AuthController } from "./controller";

import { AuthService } from "../../services/auth.service";
import { EmailService } from "../../services/email.service";

import { envs } from "../../../config";

export class AuthRoutes {


    static get routes(): Router {

        const router = Router();

        const emailService = new EmailService(
            envs.MAILER_SERVICE,
            envs.MAILER_EMAIL,
            envs.MAILER_SECRET_KEY,
            envs.SEND_EMAIL
        );
        const service = new AuthService(emailService);

        const controller = new AuthController(service);

        // Definir las rutas
        router.post('/register', controller.register);
        router.post('/login', controller.login);
        router.get('/validate-email/', controller.validateEmail);



        return router;
    }


}