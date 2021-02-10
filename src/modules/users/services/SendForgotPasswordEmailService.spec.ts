import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

/*Descreve o nome do teste.*/
describe('CreateUser', () => {

    /*Descrição do teste que será feito.*/
    it('should be able to recovery the password using the email', async () => {

        /*instancia os a base de dados fake que sera utilizada para realizar o teste.*/
        const fakesUsersRepository = new FakeUsersRepository();
        const fakeMailProvider = new FakeMailProvider();

        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')
        const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(fakesUsersRepository, fakeMailProvider);
        
        /*Cria um usuario com e-mail para fazer o teste de envio de e-mail*/
        await fakesUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '12345',
        });

        /*Envia um e-mail para johndoe@gmail.com*/
        await sendForgotPasswordEmailService.excute({
            email: 'johndoe@gmail.com',
        });

        expect(sendMail).toHaveBeenCalled();
    });

    /*Descrição do teste que será feito.*/
    it('should be able to recovery a non-existing user password', async () => {

        /*instancia os a base de dados fake que sera utilizada para realizar o teste.*/
        const fakesUsersRepository = new FakeUsersRepository();
        const fakeMailProvider = new FakeMailProvider();

        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')
        const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(fakesUsersRepository, fakeMailProvider);

        /*Envia um e-mail para johndoe@gmail.com e espera que o e-mail não seja enviado, porque não tem um usuario*/
        await expect (sendForgotPasswordEmailService.excute({
            email: 'johndoe@gmail.com',
        })).rejects.toBeInstanceOf(AppError);
    });
});

