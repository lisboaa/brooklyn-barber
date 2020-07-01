import { getRepository } from 'typeorm';
import User from '../models/User';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}
class CreateUserService {
  public async excute({ name, email, password }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExist = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExist) {
      throw new Error('Email address already used.');
    }

    const user = usersRepository.create({
      name,
      email,
      password,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;