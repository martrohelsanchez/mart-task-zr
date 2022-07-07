/* global Multer */

import { Ability } from '@casl/ability';
import winston from 'winston';

import { UserRole } from 'src/commons/constants/roles';

import { Admin as CustomUser } from '../../../commons/types/Admin.type';

declare global {
  namespace Express {
    interface User extends CustomUser {
      role: UserRole;
    }

    interface Request {
      ability: Ability<any>;
      file: Multer.File;
      user?: User;
      log: winston.Logger;
    }
  }
}
