import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakesUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

//:Descreve o nome do teste.
describe('UpdateUserAvatar', () => {
    beforeEach(() => {
        
        //instancia os a base de dados fake que sera utilizada para realizar o teste.
        fakesUsersRepository = new FakeUsersRepository();
        fakeStorageProvider = new FakeStorageProvider();

        //instancia o service que será utilizado para fazer os teste e passa
        //como parametro o repository fake para que seja consumido os dados fake.
        updateUserAvatar = new UpdateUserAvatarService(
            fakesUsersRepository, fakeStorageProvider
        );

    });
    
    //Descrição do teste que será feito.
    it('should be able to create a new user', async () => {
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
            const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

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

