import path from 'path';
import fs from 'fs';
import User from '@modules/users/infra/typeorm/entities/User';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUserRepository';
import { injectable, inject } from 'tsyringe';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequestDTO {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfile {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ){}
  
  public async execute({ user_id, name, email, password, old_password }: IRequestDTO): Promise<User> {
    const user = await this.userRepository.findById(user_id)

    if(!user) {
      throw new AppError('User not found');
    }

    const userWithUpdatedEmail = await this.userRepository.findByEmail(email);

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError('E-mail already in use.');
    }

    user.name = name;
    user.email = email;

    if(password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password.',
      );
    }

    if(password && old_password) {
      const chenckOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password
      );

      if(!chenckOldPassword) {
        throw new AppError('Old password does not match');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    return await this.userRepository.save(user);
  }
}

export default UpdateProfile;
