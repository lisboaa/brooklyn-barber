
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUserRepository';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequestDTO {
  user_id: string;
}

@injectable()
class ListProviderService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository
  ){}
  
  public async execute({ user_id }: IRequestDTO): Promise<User[]> {
        const users = await this.userRepository.findAllProviders({
            except_user_id: user_id,
        });

        return users;
    }
}

export default ListProviderService;
