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

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });
        
        const appointment = await createAppointment.execute({
            date: new Date(2020, 4, 10, 13),
            provider_id: 'user_id',
            user_id: 'provider_id'
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('user_id');
    });

    it('should not be able to create two appointment on the same time', async () => {
        const appointmentDate = new Date(2021, 4, 10, 11);

        await createAppointment.execute({
            date: appointmentDate,
            provider_id: 'user_id',
            user_id: 'provider_id'
        });

        await expect(createAppointment.execute({
            date: appointmentDate,
            provider_id: 'user_id',
            user_id: 'provider_id'
        }),
        ).rejects.toBeInstanceOf(AppError)
    });

    it('should not be able to create an appointments on a past date', async() => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 25, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10, 11),
                provider_id: 'user_id',
                user_id: 'provider_id'
            }),
        ).rejects.toBeInstanceOf(AppError);
    })

    it('should not be able to create an appointments with same user as provider', async() => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 4, 25, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2021, 4, 10, 11),
                provider_id: 'user_id',
                user_id: 'user_id'
            }),
        ).rejects.toBeInstanceOf(AppError);
    })

    it('should not be able to create an appointments before 8am and after 5pm', async() => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 4, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2021, 4, 11, 7),
                provider_id: 'provider_id',
                user_id: 'user_id'
            }),
        ).rejects.toBeInstanceOf(AppError);

        await expect(
            createAppointment.execute({
                date: new Date(2021, 4, 11, 18),
                provider_id: 'provider_id',
                user_id: 'user_id'
            }),
        ).rejects.toBeInstanceOf(AppError);
    })
});

