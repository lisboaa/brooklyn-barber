import { Router, Request, Response, json } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';
import CreateAppointmentsService from '../service/CreateAppointmentService';
import AppointmentRepository from '../repository/AppointmentRepository';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', async (request: Request, response: Response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentsService();

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});

appointmentsRouter.get('/', async (request: Request, response: Response) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentRepository.find();
  return response.json(appointments);
});

export default appointmentsRouter;
