import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUserRepository';
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
    ) {}

    public async excute({ email }: IRequestDTO): Promise<void> {
        const checkuserExists = await this.userRepository.findByEmail(email);

        if(!checkuserExists) {
            throw new AppError('User does not exists.');
        }

        this.mailProvider.sendMail(
            email,
            'Pedido de recuperação de senha recebido',   
        );
    }
}

export default SendForgotPasswordEmailService;
