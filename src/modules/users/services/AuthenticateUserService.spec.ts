import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;
let fakeStorageProvider: FakeStorageProvider;

//Descreve o nome do teste.
describe('AuthenticateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        fakeStorageProvider = new FakeStorageProvider();
        createUser = new CreateUserService(fakeUsersRepository,fakeHashProvider);
        authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
    });

    //Descrição do teste que será feito.
    it('should be able to authenticate', async () => {
        const user = await createUser.excute({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456',
        });
        
        const response = await authenticateUser.execute({
            email: 'johndoe@gmail.com',
            password: '123456',
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });


    it('should not be able to authenticate with non existing user', async () => {

        await expect(
            authenticateUser.execute({
            email: 'johndoe@gmail.com',
            password: '123456',
        }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update avatar from non existing user', async () => {
        const authenticateUser = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);
        
        await expect(
            authenticateUser.execute({
            user_id: 'non-existing-user',
            avatarFilename: 'avatar.jpg',
        }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate with wrong password', async () => {

        await createUser.excute({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456',
        });

        await expect(
            authenticateUser.execute({
                email: 'johndoe@gmail.com',
                password: 'wrong-password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});

