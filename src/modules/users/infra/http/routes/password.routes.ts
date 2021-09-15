import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';


import ResetPasswordControllert from '../controllers/ResetPasswordController';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import { join } from 'path';
import { JoinColumn } from 'typeorm';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordControllert = new ResetPasswordControllert();

passwordRouter.post('/forgot',
    celebrate({[Segments.BODY]: {
        email: Joi.string().email().required(),
    }}),
forgotPasswordController.create);


passwordRouter.post(
    '/reset',
    celebrate({[Segments.BODY]: {
        token: Joi.string().uuid().required(),
        password: Joi.string().required(),
        password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    }}),
    resetPasswordControllert.create,
);

export default passwordRouter;
