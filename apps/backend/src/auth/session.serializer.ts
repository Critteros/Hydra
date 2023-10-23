import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { UserService } from '@/auth/user.service';
import { AuthenticatedUser } from '@/global';

type StoredSession = {
  userId: AuthenticatedUser['uid'];
  accountType: AuthenticatedUser['accountType'];
};

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  override serializeUser(
    user: AuthenticatedUser,
    done: (err: unknown, data: StoredSession) => void,
  ) {
    done(null, {
      userId: user.uid,
      accountType: user.accountType,
    });
  }

  override async deserializeUser(
    payload: StoredSession,
    done: (err: unknown, data: StoredSession | null) => void,
  ) {
    const user = await this.userService.find({ uid: payload.userId });

    if (!user) {
      return done(null, null);
    }

    done(null, payload);
  }
}
