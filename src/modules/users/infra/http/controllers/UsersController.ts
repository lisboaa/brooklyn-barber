import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class CreateUserController {
    public async create(request: Request, response: Response): Promise<Response> {

    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.excute({
			name,
			email,
			password,
    });

			delete user.password;

			return response.json(user);
    }
}