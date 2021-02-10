import User from '../../infra/typeorm/entities/User';
import IUsersTokensRepository from '@modules/users/repositories/IUserTokensRepository';

import UserToken from '../../infra/typeorm/entities/UserToken';
import { uuid } from 'uuidv4';

class FakeUserTokensRepository implements IUsersTokensRepository {
  
  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
      
    const userToken = new UserToken();

      Object.assign(userToken, {
        id: uuid(),
        token: uuid(),
        user_id,
      });

      this.userTokens.push(userToken);

      return userToken;
  }

}

export default FakeUserTokensRepository;
