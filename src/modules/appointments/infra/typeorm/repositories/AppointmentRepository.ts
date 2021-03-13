import { getRepository, Repository, Between, Raw } from 'typeorm';
import { startOfMonth, endOfMonth } from 'date-fns'

import Appointment from '../entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInManthFromProviderDTO from '@modules/appointments/dtos/IFindAllInManthFromProviderDTO';
import IFindAllInDayFromProvider from '@modules/appointments/dtos/IFindAllInDayFromProvider';

class AppointmentRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;
  
  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year
  }: IFindAllInManthFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');
      const appointments = await this.ormRepository.find({
        where: {
          provider_id,
          date: Raw(dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
            ),
        },
      });
      return appointments;
  }


  public async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year
  }: IFindAllInDayFromProvider): Promise<Appointment[]> {
    const parsedDay = String(day).padStart(2, '0');

    const parsedMonth = String(month).padStart(2, '0');

      const appointments = await this.ormRepository.find({
        where: {
          provider_id,
          date: Raw(dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
            ),
        },
      });
      return appointments;
  }

  public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentRepository;
