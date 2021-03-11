import { Router } from 'express';

import PerfilController from '../controllers/ProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const perfilController = new PerfilController();

profileRouter.use(ensureAuthenticated);

profileRouter.put('/', perfilController.update);
profileRouter.get('/', perfilController.show);

export default profileRouter;
