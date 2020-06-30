import { Router, Request, Response, json } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';
import CreateAppointmentsService from '../service/CreateAppointmentService';
import AppointmentRepository from '../repository/AppointmentRepository';

const appointmentsRouter = Router();

appointmentsRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentsService();

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

appointmentsRouter.get('/', (request: Request, response: Response) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const appointments = appointmentRepository.find();
  return response.json(appointments);
});

export default appointmentsRouter;
