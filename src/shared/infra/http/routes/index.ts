import { Router } from 'express';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.route';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessions from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessions);
export default routes;
