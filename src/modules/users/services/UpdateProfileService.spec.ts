import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakesUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let UpdateProfile: UpdateProfileService;

//:Descreve o nome do teste.
describe('UpdateProfile', () => {
    beforeEach(() => {
        
        //instancia os a base de dados fake que sera utilizada para realizar o teste.
        fakesUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        //instancia o service que será utilizado para fazer os teste e passa
        //como parametro o repository fake para que seja consumido os dados fake.
        UpdateProfile = new UpdateProfileService(
            fakesUsersRepository, fakeHashProvider
        );

    });
    
    //Descrição do teste que será feito.
    it('should be able update the profile', async () => {
        const user = await fakesUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com.br',
            password: '12345',
        });

        const updateUser = await UpdateProfile.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'johntre@example.com.br'
        });

        expect(updateUser.name).toBe('John Trê');
        expect(updateUser.email).toBe('johntre@example.com.br');
    });

        
    //Descrição do teste que será feito.
    it('should be able to change to another user email', async () => {
        await fakesUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com.br',
            password: '123456',
        });

        const user = await fakesUsersRepository.create({
            name: 'Test',
            email: 'test@example.com.br',
            password: '123456'
        });

        await expect(UpdateProfile.execute({
            user_id: user.id,
            name: 'John Doe',
            email: 'johndoe@example.com.br'
        })).rejects.toBeInstanceOf(AppError);

    });

        //Descrição do teste que será feito.
        it('should be able update the password', async () => {
            const user = await fakesUsersRepository.create({
                name: 'John Doe',
                email: 'johndoe@example.com.br',
                password: '12345',
            });
    
            const updateUser = await UpdateProfile.execute({
                user_id: user.id,
                name: 'John Trê',
                email: 'johntre@example.com.br',
                old_password: '12345',
                password: '123123'
            });
    
            expect(updateUser.password).toBe('123123');
        });

        //Descrição do teste que será feito.
        it('should not be able to update the password without old password', async () => {
            const user = await fakesUsersRepository.create({
                name: 'John Doe',
                email: 'johndoe@example.com.br',
                password: '123456',
            });
    
            await expect(
                UpdateProfile.execute({
                user_id: user.id,
                name: 'John Trê',
                email: 'johntre@example.com.br',
                password: '123123'
            }),
            ).rejects.toBeInstanceOf(AppError);
        });

        //Descrição do teste que será feito.
        it('should not be able to update the password without wrong old password', async () => {
            const user = await fakesUsersRepository.create({
                name: 'John Doe',
                email: 'johndoe@example.com.br',
                password: '123456',
            });
    
            await expect(
                UpdateProfile.execute({
                user_id: user.id,
                name: 'John Trê',
                email: 'johntre@example.com.br',
                old_password: 'wrong-old-password',
                password: '123123'
            }),
            ).rejects.toBeInstanceOf(AppError);
        });

});

