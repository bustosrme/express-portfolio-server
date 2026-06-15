import { CustomError, LoginUserDto, RegisterUserDto } from "../../domain";

import { UserEntity } from "../../domain/entities/user.entity";
import { prisma } from "../../data";

import { EmailService } from "./email.service";

import routes from "../../config/routes";
import { bcryptAdapter, JWTAdapter } from "../../utils";
import { envs } from "../../config";
import { PrismaClient } from "@prisma/client";

export class AuthService {
    constructor(
        private readonly emailService: EmailService,
    ) { }

    public async register(registerUserDto: RegisterUserDto) {
        const existUser = await prisma.user.findFirst({ where: { email: registerUserDto.email } });
        if (existUser) throw CustomError.badRequest('Email already exist');

        try {
            // Encriptar la contraseña
            registerUserDto.password = await bcryptAdapter.hash(registerUserDto.password);

            const user = await prisma.user.create({ data: registerUserDto });


            // JWT <---- para mantener la autenticación del usuario

            // Email de confirmación
            this.sendEmailValidateionLink(registerUserDto.email);
            const { password, ...userEntity } = UserEntity.fromObject(user);

            return {
                user: userEntity,
                token: 'ABC'
            };

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    public async login(loginUserDto: LoginUserDto) {
        const user = await prisma.user.findFirst({ where: { email: loginUserDto.email } });
        if (!user) throw CustomError.badRequest('Email not exist');

        const isMatching = bcryptAdapter.compare(loginUserDto.password, user.password);
        if (!isMatching) throw CustomError.badRequest('Password is not valid');


        const { password, ...userEntity } = UserEntity.fromObject(user);

        const token = await JWTAdapter.generateToken({ id: user.id, email: user.email });
        if (!token) throw CustomError.internalServer('Error while creating JWT');

        return {
            user: userEntity,
            token: token,
        }
    }

    public async validateEmail(token: string) {
        const payload = await JWTAdapter.validateToken(token);
        if (!payload) throw CustomError.unauthorized('Invalid token');

        const { email } = payload as { email: string };
        if (!email) throw CustomError.internalServer('Email not in token');

        const user = await prisma.user.findFirst({ where: { email } });
        if (!user) throw CustomError.internalServer('Email not exists');

        await prisma.user.update({ where: { id: user.id }, data: { emailValidated: true } });

        return true;
    }

    private sendEmailValidateionLink = async (email: string) => {
        const token = await JWTAdapter.generateToken({ email });
        if (!token) throw CustomError.internalServer('Error while creating JWT');

        const link = `${envs.BASE_URL + routes.API}/auth/validate-email/${token}`;
        const html = `
            <h1>Validate your email</h1>
            <p>Click on the following link to validate your email</p>
            <a href="${link}">Validate your email: ${email}</a>
        `;

        const options = {
            to: email,
            subject: 'Validate your email',
            htmlBody: html
        };

        const isSent = await this.emailService.sendEmail(options);
        if (!isSent) throw CustomError.internalServer('Error while sending email');
    }

}