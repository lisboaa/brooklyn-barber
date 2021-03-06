import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakesAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

//Descreve o nome do teste.
describe('CreateAppointment', () => {
    beforeEach(() => {        
        //instancia os a base de dados fake que sera utilizada para realizar o teste.
        fakesAppointmentsRepository = new FakeAppointmentsRepository();

        //instancia o service que será utilizado para fazer os teste e passa
        //como parametro o repository fake para que seja consumido os dados fake.
        createAppointment = new CreateAppointmentService(
            fakesAppointmentsRepository,
        );
    });
    
    //Descrição do teste que será feito.
    it('should be able to create a new appointment', async () => {

        const appointment = await createAppointment.execute({
            date: new Date(),
            provider_id: '123456',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123456');
    });

    it('should not be able to create two appointments on the same time', async () => {
        const appointmentDate = new Date();

        await createAppointment.execute({
            date: new Date(),
            provider_id: '123456',
        });

        await expect(createAppointment.execute({
            date: appointmentDate,
            provider_id: '123456',
        })).rejects.toBeInstanceOf(AppError)
    });
});

