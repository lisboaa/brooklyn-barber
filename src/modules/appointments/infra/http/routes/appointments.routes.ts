import { Router, Request, Response } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmenteController from '../controllers/AppointmentController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentController = new AppointmenteController();
const providerAppointmentController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticated);



appointmentsRouter.post('/', 

celebrate({
    [Segments.BODY]: {
        provider_id: Joi.string().uuid().required(),
        date: Joi.date()
    }
}),
appointmentController.create);

appointmentsRouter.get('/me', providerAppointmentController.index);

// appointmentsRouter.get('/', async (request: Request, response: Response) => {
//   const appointments = await appointmentRepository.find();
//   return response.json(appointments);
// });

export default appointmentsRouter;
