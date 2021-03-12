import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProviderService from './ListProviderService';


let fakesUsersRepository: FakeUsersRepository;
let listProviders: ListProviderService;

//:Descreve o nome do teste.
describe('UpdateProfile', () => {
    beforeEach(() => {
        
        //instancia os a base de dados fake que sera utilizada para realizar o teste.
        fakesUsersRepository = new FakeUsersRepository();
        //instancia o service que será utilizado para fazer os teste e passa
        //como parametro o repository fake para que seja consumido os dados fake.
        listProviders = new ListProviderService(fakesUsersRepository)

    });
    
    //Descrição do teste que será feito.
    it('should be able to list the providers', async () => {
        const user1 = await fakesUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com.br',
            password: '12345',
        });

        const user2 = await fakesUsersRepository.create({
            name: 'John Trê',
            email: 'johndoetre@example.com.br',
            password: '12345',
        });

        const loggedUser =  await fakesUsersRepository.create({
            name: 'John Qua',
            email: 'johndoequa@example.com.br',
            password: '12345',
        });

        const providers = await listProviders.execute({
            user_id: loggedUser.id,
        }); 

        expect(providers).toEqual([user1, user2]);
    });
    
});

