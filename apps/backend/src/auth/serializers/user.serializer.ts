import { Injectable, Logger } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { debug } from 'debug';

import { UserService, type AuthenticatedUser } from '@/user';

type UserInSession = {
  uid: AuthenticatedUser['uid'];
};

@Injectable()
export class UserSerializer extends PassportSerializer {
  private readonly debug = debug(`hydra:auth:${UserSerializer.name}`);
  private readonly logger = new Logger(UserSerializer.name);

  constructor(private readonly userService: UserService) {
    super();
    debug.log = this.logger.debug.bind(this.logger);
  }

  override serializeUser(
    user: AuthenticatedUser,
    done: (err: unknown, data: UserInSession) => void,
  ) {
    const debug = this.debug.extend('serializeUser');
    debug('', user);
    done(null, { uid: user.uid });
  }

  override async deserializeUser(
    { uid }: Partial<UserInSession>,
    done: (err: unknown, data: AuthenticatedUser | null) => void,
  ) {
    const debug = this.debug.extend('deserializeUser');

    if (!uid) {
      return done(null, null);
    }

    debug('', { uid });
    const user = await this.userService.find({ uid });

    if (!user) {
      debug('User not found');
      return done(null, null);
    }

    done(null, user);
  }
}
