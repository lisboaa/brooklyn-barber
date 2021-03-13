import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';



let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

//:Descreve o nome do teste.
describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
            fakeAppointmentsRepository,
        );
    });

    //Descrição do teste que será feito.
    it('should be able to list the month availability from provider', async () => {
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 3, 20, 8, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 4, 20, 9, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 4, 20, 10, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 4, 20, 11, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 4, 20, 12, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 4, 20, 13, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 4, 20, 14, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 4, 20, 15, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 4, 20, 16, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 4, 20, 17, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 4, 20, 21, 0, 0),
        });

        const availability = await listProviderMonthAvailability.execute({
            provider_id: 'user',
            year: 2020,
            month: 5,
        })

        expect(availability).toEqual(
            expect.arrayContaining([
                { day: 19, available: true },
                { day: 20, available: false },
                { day: 21, available: true },
                { day: 22, available: true },
            ])
        )
    });

});
