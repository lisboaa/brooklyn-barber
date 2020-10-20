import { Router, Request, Response } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

// import { getCustomRepository } from 'typeorm';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.excute({
      name,
      email,
      password,
    });

    // delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request: Request, response: Response) => {
    const updateAvatarService = new UpdateUserAvatarService();

    const user = await updateAvatarService.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    // delete user.password;

    return response.json(user);
  },
);

// usersRouter.get('/', async (request: Request, response: Response) => {
//   const appointmentRepository = getCustomRepository(Use)
// })

export default usersRouter;
