import { NextFunction, Response, Request } from 'express';

import UnauthenticatedError from '../errors/UnauthenticatedError';
import { logger } from '../libs/Logger';
import { defineUserAbilities } from '../libs/abilityBuilder';

export async function authenticateRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.user) {
      req.ability = defineUserAbilities(req.user.role);

      return next();
    }

    if (req.get('x-cloudscheduler') === 'true') {
      return next();
    }

    throw new UnauthenticatedError();
  } catch (error) {
    logger.warn('Authentication error', error);

    next(new UnauthenticatedError());
  }
}
