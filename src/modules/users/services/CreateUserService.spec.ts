import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

//Descreve o nome do teste.
describe('CreateUser', () => {
    
    //Descrição do teste que será feito.
    it('should be able to create a new user', async () => {
        
        //instancia os a base de dados fake que sera utilizada para realizar o teste.
        const fakesUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        //instancia o service que será utilizado para fazer os teste e passa
        //como parametro o repository fake para que seja consumido os dados fake.
        const createUser = new CreateUserService(
            fakesUsersRepository, fakeHashProvider
        );

        const user = await createUser.excute({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456',
        });

        expect(user).toHaveProperty('id');
    });

    it('should not be able to create a new user with same amail from another', async () => {
        
        const fakesUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        
        const createUser = new CreateUserService(
            fakesUsersRepository, fakeHashProvider
        );

        const appointmentDate = new Date(2020, 4, 10, 11);

        await createUser.excute({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456',
        });

        await expect(createUser.excute({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456',
        })).rejects.toBeInstanceOf(AppError)
    });
});

