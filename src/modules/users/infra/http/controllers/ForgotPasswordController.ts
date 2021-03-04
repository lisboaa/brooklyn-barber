import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

import SendForgetPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';

export default class ForgotPasswordController {

    public async create(request: Request, response: Response): Promise<Response> {

    const { email } = request.body;

    const sendForgotPasswordEmail = container.resolve(SendForgetPasswordEmailService);

    await sendForgotPasswordEmail.excute({
        email
    });
    
    return response.status(204).json();
    }
}