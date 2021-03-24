import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUserRepository';
import { injectable, inject } from 'tsyringe';

interface IRequestDTO {
  user_id: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
  ){}
  
  public async execute({ user_id }: IRequestDTO): Promise<User> {
    const user = await this.userRepository.findById(user_id)

    if(!user) {
        throw new AppError('User not found.');
    }

    return user;
  }
}

export default ShowProfileService;
