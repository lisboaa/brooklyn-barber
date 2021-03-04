import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokenRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import ResetPasswordService from './ResetPasswordService';


let fakesUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

/*Descreve o nome do teste.*/
describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {

        /*instancia os a base de dados fake que sera utilizada para realizar o teste.*/
        
        fakesUsersRepository = new FakeUsersRepository();
        fakeUserTokensRepository = new FakeUserTokensRepository();
        fakeHashProvider = new FakeHashProvider();
        
        resetPassword = new ResetPasswordService(fakesUsersRepository, fakeUserTokensRepository, fakeHashProvider);

    });

    /*Descrição do teste que será feito.*/
    it('should be able to rest the password', async () => {
        
        /*Cria um usuario para fazer o teste de recuperação de senha*/
        let user = await fakesUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '12345',
        });

        const { token } = await fakeUserTokensRepository.generate(user.id);

        const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

        /*Envia um e-mail para johndoe@gmail.com*/
        await resetPassword.excute({
            password: '123123',
            token,
        });

        const updateUser = await fakesUsersRepository.findById(user.id);

        expect(generateHash).toHaveBeenCalledWith('123123');
        expect(updateUser?.password).toBe('123123');
    });

    /*Descrição do teste que será feito.*/
    it('should be able to rest the password with non-existing token', async () => {
        const { token } = await fakeUserTokensRepository.generate(
            'non-existing-user',
        );

        await expect(
            resetPassword.excute({
                token,
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError)
    });

        /*Descrição do teste que será feito.*/
        it('should not be able to rest password if passed more than 2 hours', async () => {
        
            /*Cria um usuario para fazer o teste de recuperação de senha*/
            let user = await fakesUsersRepository.create({
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: '12345',
            });
    
            const { token } = await fakeUserTokensRepository.generate(user.id);
    
            jest.spyOn(Date, 'now').mockImplementationOnce(() => {
                const customDate = new Date();

                return customDate.setHours(customDate.getHours() +3);
            });
    
            /*Envia um e-mail para johndoe@gmail.com*/
            await expect(
                resetPassword.excute({
                password: '123123',
                token
                }),
            ).rejects.toBeInstanceOf(AppError); 
    
        });
});

