import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokenRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';


let fakesUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail : SendForgotPasswordEmailService;

/*Descreve o nome do teste.*/
describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {

        /*instancia os a base de dados fake que sera utilizada para realizar o teste.*/
        
        fakesUsersRepository = new FakeUsersRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokensRepository = new FakeUserTokensRepository();
        
        sendForgotPasswordEmail = new SendForgotPasswordEmailService(fakesUsersRepository, fakeMailProvider, fakeUserTokensRepository);

    });

    /*Descrição do teste que será feito.*/
    it('should be able to recovery the password using the email', async () => {

        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')
        
        /*Cria um usuario com e-mail para fazer o teste de envio de e-mail*/
        await fakesUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '12345',
        });

        /*Envia um e-mail para johndoe@gmail.com*/
        await sendForgotPasswordEmail.excute({
            email: 'johndoe@example.com',
        });

        expect(sendMail).toHaveBeenCalled();
    });

    /*Descrição do teste que será feito.*/
    it('should be able to recovery a non-existing user password', async () => {

        /*Envia um e-mail para johndoe@gmail.com e espera que o e-mail não seja enviado, porque não tem um usuario*/
        await expect (sendForgotPasswordEmail.excute({
            email: 'johndoe@gmail.com',
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should generate a forgot passoword token', async () => {
        /*instancia os a base de dados fake que sera utilizada para realizar o teste.*/

        const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate')

        const user = await fakesUsersRepository.create({
            name:'jhon doe',
            email: 'johndoe@example.com',
            password: '12345'
        })

        await sendForgotPasswordEmail.excute({
            email: 'johndoe@example.com'
        });

        /*Envia um e-mail para johndoe@gmail.com e espera que o e-mail não seja enviado, porque não tem um usuario*/
        expect(generateToken).toHaveBeenCalledWith(user.id);
    })
});

