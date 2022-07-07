/* eslint-disable max-params */
import { PassportStatic } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import { UserRole } from 'src/commons/constants/roles';

import NotFoundError from 'src/server/errors/NotFoundError';
import UnauthenticatedError from 'src/server/errors/UnauthenticatedError';
import { findAccount } from 'src/server/services/AccountService';
import { authenticate } from 'src/server/services/AuthService';

export function configurePassport(passport: PassportStatic) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const { userRole } = req.body as { userRole: UserRole };

          const account = await authenticate({
            password,
            email,
            userRole,
          });

          return done(null, account);
        } catch (error: any) {
          switch (error.constructor) {
            case NotFoundError:
            case UnauthenticatedError:
              return done(null, false, {
                error: {
                  code: error.errorCode,
                  data: {
                    message: error.message,
                  },
                  message: error.message,
                },
              } as any);
            default:
              return done(error);
          }
        }
      }
    )
  );

  passport.serializeUser((user: any, done) => {
    done(null, {
      id: user.id,
      role: user.role,
    });
  });

  passport.deserializeUser(async (accountInfo, done) => {
    try {
      const { id, role } = accountInfo as { id: string; role: UserRole };
      const account = await findAccount({
        id,
        role,
      });

      if (!account) {
        throw new NotFoundError();
      }

      done(null, account as any);
    } catch (error) {
      done(error);
    }
  });
}
