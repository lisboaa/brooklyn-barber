import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakesUsersRepository:FakeUsersRepository;
let fakeHashProvider:FakeHashProvider;
let createUser:CreateUserService;

//Descreve o nome do teste.
describe('CreateUser', () => {
    beforeEach(() => {        
        //instancia os a base de dados fake que sera utilizada para realizar o teste.
        fakesUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        //instancia o service que será utilizado para fazer os teste e passa
        //como parametro o repository fake para que seja consumido os dados fake.
        createUser = new CreateUserService(
            fakesUsersRepository, fakeHashProvider
        );
    })
    
    //Descrição do teste que será feito.
    it('should be able to create a new user', async () => {
        const user = await createUser.excute({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456',
        });

        expect(user).toHaveProperty('id');
    });

    it('should not be able to create a new user with same amail from another', async () => {
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

