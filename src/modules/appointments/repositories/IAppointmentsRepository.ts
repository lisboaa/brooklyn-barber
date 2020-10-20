import Appointment  from '../infra/typeorm/entities/Appointment';

interface IAppointmentsRepository {
  findByData(date: Date): Promise<Appointment | undefined>;
}

export default IAppointmentsRepository;