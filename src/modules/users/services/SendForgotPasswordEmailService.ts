import { injectable, inject } from 'tsyringe';
import path from 'path'

import IUsersRepository from '../repositories/IUserRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IMailProvider from '@shared/container/providers/MailProvider/Models/IMailProvider';
import AppError from '@shared/errors/AppError';

interface IRequestDTO {
    email: string;
}

@injectable()
class SendForgotPasswordEmailService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUsersRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,
    ) {}

    public async excute({ email }: IRequestDTO): Promise<void> {
        const user = await this.userRepository.findByEmail(email);

        if(!user) {
            throw new AppError('User does not exists.');
        }

        const {token} = await this.userTokensRepository.generate(user.id);

        //busca o arquivo do template de e-mail
        const forgotPasswordTemplate = path.resolve(
            __dirname,
            '..',
            'views',
            'forgot_password.hbs',
            );

        await this.mailProvider.sendMail({
            to: {
                name: user.name,
                email: user.email
            },
            subject: '[Lisboa] Recuperação de senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `http://localhost:3000/reset_password?token=${token}`,
                },
            },
        });
    }
}

export default SendForgotPasswordEmailService;
