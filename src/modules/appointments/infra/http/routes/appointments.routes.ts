import { Router, Request, Response } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmenteController from '../controllers/AppointmentController';

const appointmentsRouter = Router();
const appointmentController = new AppointmenteController();

appointmentsRouter.use(ensureAuthenticated);



appointmentsRouter.post('/', async (request: Request, response: Response) => {
    appointmentController.create});

// appointmentsRouter.get('/', async (request: Request, response: Response) => {
//   const appointments = await appointmentRepository.find();
//   return response.json(appointments);
// });

export default appointmentsRouter;
