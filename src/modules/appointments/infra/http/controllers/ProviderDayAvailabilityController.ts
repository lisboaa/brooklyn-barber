import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderMonthAvailabilityController {

  public async index(request: Request, response: Response): Promise<Response> {

    const { provider_id } = request.params;
    const { month, year, day } = request.body;

    const listProviderDayAvailability = container.resolve(ProviderDayAvailabilityService);

    const availability = await listProviderDayAvailability.execute({
      provider_id,
      day,
      month,
      year
    });

    return response.json(availability);
  }
}