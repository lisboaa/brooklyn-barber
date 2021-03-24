import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import Appointment  from '../infra/typeorm/entities/Appointment';
import IFindAllInManthFromProviderDTO  from '../dtos/IFindAllInManthFromProviderDTO';
import IFindAllInDayFromProvider from '../dtos/IFindAllInDayFromProvider';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(data: IFindAllInManthFromProviderDTO): Promise<Appointment[]>
  findAllInDayFromProvider(data: IFindAllInDayFromProvider): Promise<Appointment[]>;
}