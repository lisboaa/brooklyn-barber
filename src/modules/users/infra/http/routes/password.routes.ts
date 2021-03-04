import { Router } from 'express';

import ResetPasswordControllert from '../controllers/SessionController';
import ForgotPasswordController from '../controllers/ForgotPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordControllert = new ResetPasswordControllert();

passwordRouter.post('/forgot', forgotPasswordController.create);
passwordRouter.post('/reset',  resetPasswordControllert.create);

export default passwordRouter;
