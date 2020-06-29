import { Router, Request, Response, json } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentRepository from '../repository/AppointmentRepository';
import CreateAppointmentsService from '../service/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentRepository();

appointmentsRouter.post('/', (request: Request, response: Response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentsService(
      appointmentRepository,
    );

    const appointment = createAppointment.execute({
      date: parsedDate,
      provider,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

appointmentsRouter.get('/', (request: Request, response: Response) => {
  const appointments = appointmentRepository.all();
  return response.json(appointments);
});

export default appointmentsRouter;
