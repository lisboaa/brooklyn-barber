import { Router, Request, Response } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();
const providersController = new ProvidersController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);

// appointmentsRouter.get('/', async (request: Request, response: Response) => {
//   const appointments = await appointmentRepository.find();
//   return response.json(appointments);
// });

export default providersRouter;
