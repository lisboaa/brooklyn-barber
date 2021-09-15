import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import PerfilController from '../controllers/ProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import { join } from 'path';
import { JoinColumn } from 'typeorm';

const profileRouter = Router();
const perfilController = new PerfilController();

profileRouter.use(ensureAuthenticated);

profileRouter.put('/', 
celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.when('old_password', {
        is: Joi.exist(),
        then: Joi.required(),
      }),
      password_confirmation: Joi.when('password', {
        is: Joi.exist(),
        then: Joi.valid(Joi.ref('password')).required(),
      }),
    },
  }),
  perfilController.update,
);

export default profileRouter;
