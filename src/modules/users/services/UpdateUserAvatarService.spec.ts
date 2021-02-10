import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

//Descreve o nome do teste.
describe('UpdateUserAvatar', () => {
    
    //Descrição do teste que será feito.
    it('should be able to create a new user', async () => {
        
        //instancia os a base de dados fake que sera utilizada para realizar o teste.
        const fakesUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeStorageProvider();

        //instancia o service que será utilizado para fazer os teste e passa
        //como parametro o repository fake para que seja consumido os dados fake.
        const updateUserAvatar = new UpdateUserAvatarService(
            fakesUsersRepository, fakeHashProvider
        );

        const user = await fakesUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com.br',
            password: '12345',
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFilename: 'avatar.jpg',
        });

        expect(user.avatar).toBe('avatar.jpg');
    });

        //Descrição do teste que será feito.

        it('should delete old avatar when updating new one', async () => {
        
            //instancia os a base de dados fake que sera utilizada para realizar o teste.

            const fakesUsersRepository = new FakeUsersRepository();
            const fakeStorageProvider = new FakeStorageProvider();
    
            const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

            //instancia o service que será utilizado para fazer os teste e passa
            //como parametro o repository fake para que seja consumido os dados fake.

            const updateUserAvatar = new UpdateUserAvatarService(
                fakesUsersRepository, fakeStorageProvider
            );

            const user = await fakesUsersRepository.create({
                name: 'John Doe',
                email: 'johndoe@example.com.br',
                password: '12345',
            });

            await updateUserAvatar.execute({
                user_id: user.id,
                avatarFilename: 'avatar.jpg',
            });



            await updateUserAvatar.execute({
                user_id: user.id,
                avatarFilename: 'avatar2.jpg',
            });

            expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
            expect(user.avatar).toBe('avatar2.jpg');
        });
});

