import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import CreateUserService from '@modules/users/services/CreateUserService';

export default class UserAvatarController {
    public async update(request: Request, response: Response): Promise<Response> {
        const updateAvatarService = container.resolve(UpdateUserAvatarService);

        const user = await updateAvatarService.execute({
          user_id: request.user.id,
          avatarFilename: request.file.filename,
        });
    
        delete user.password;
    
        return response.json(user);
    }
}