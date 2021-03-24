import { injectable, inject } from 'tsyringe';
import { isAfter, addHours} from 'date-fns';
import IUsersRepository from '../repositories/IUserRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';

interface IRequestDTO {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUsersRepository,

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async excute({ token, password }: IRequestDTO): Promise<void> {
        const userToken = await this.userTokensRepository.findByToken(token);

        if(!userToken) {
            throw new AppError('User token does not exists');
        }

        const user = await this.userRepository.findById(userToken.user_id);

        if(!user) {
            throw new AppError('User does not exists');
        }

        const tokenCreatedAt = userToken.created_at;
        
        const compareDate =  addHours(tokenCreatedAt, 2);

        if(isAfter(Date.now(), compareDate)) {
            throw new AppError('Token expire');
        };

        user.password =  await this.hashProvider.generateHash(password);

        await this.userRepository.save(user);
    }
}

export default ResetPasswordService;
