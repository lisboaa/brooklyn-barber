import { inject, injectable } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';


interface IRequestDTO {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}
@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) { }

  public async execute({
    provider_id,
    year,
    month,
    day
  }: IRequestDTO): Promise<Appointment[]> {
      const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
          provider_id,
          year,
          month,
          day
      });

      return appointments;

  }
}

export default ListProviderAppointmentsService;
