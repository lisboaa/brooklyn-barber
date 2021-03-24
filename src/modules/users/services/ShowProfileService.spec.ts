import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';
import UpdateProfileService from './UpdateProfileService';

let fakesUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;
let showProfile: ShowProfileService

//:Descreve o nome do teste.
describe('UpdateProfile', () => {
    beforeEach(() => {
        
        //instancia os a base de dados fake que sera utilizada para realizar o teste.
        fakesUsersRepository = new FakeUsersRepository();
        //instancia o service que será utilizado para fazer os teste e passa
        //como parametro o repository fake para que seja consumido os dados fake.
        showProfile = new ShowProfileService(fakesUsersRepository)

    });
    
    //Descrição do teste que será feito.
    it('should be able show the profile', async () => {
        const user = await fakesUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com.br',
            password: '12345',
        });


        const profile = await showProfile.execute({
            user_id: user.id
        });

        expect(profile.name).toBe('John Doe');
        expect(profile.email).toBe('johndoe@example.com.br');
    });
    
    //Descrição do teste que será feito.
    it('should be able show the profile from non-existing user', async () => {
        expect(
            showProfile.execute({
                user_id: 'non-existing-user-id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});

