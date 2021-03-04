import { injectable, inject } from 'tsyringe';

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

        await this.mailProvider.sendMail(
            email,
                `Pedido de recuperação de senha recebido: ${token}`,
        );
    }
}

export default SendForgotPasswordEmailService;
