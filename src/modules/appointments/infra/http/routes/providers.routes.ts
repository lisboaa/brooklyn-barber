import { Router, Request, Response } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

const providersRouter = Router();

const providersController = new ProvidersController();
const providersMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providersDayAvailabilityController = new ProviderDayAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);

providersRouter.get('/', 
celebrate({
    [Segments.PARAMS]: {
        provider_id: Joi.string().uuid().required(),
    },
}),
providersController.index);

providersRouter.get('/:id/month-availability',
celebrate({
    [Segments.PARAMS]: {
        provider_id: Joi.string().uuid().required(),
    },
}), providersMonthAvailabilityController.index);
providersRouter.get('/:id/day-availability', providersDayAvailabilityController.index);

export default providersRouter;
