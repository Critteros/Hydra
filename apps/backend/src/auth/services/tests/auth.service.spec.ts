import { Test } from '@nestjs/testing';

import type { User } from '@prisma/client';

import { UserService } from '@/user/services/user.service';
import { IntegrationTestManager } from '@/utils/testing/integration-test-manager';

import { AuthModule } from '../../auth.module';
import { AuthService } from '../auth.service';

describe('Test AuthService', () => {
  let authService: AuthService;
  let userService: UserService;

  new IntegrationTestManager().installHooks();

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    authService = moduleRef.get(AuthService);
    userService = moduleRef.get(UserService);
  });

  describe('validateUser', () => {
    let user: User;

    beforeEach(async () => {
      user = await userService.createUser({
        email: 'sampleuser@email.com',
        password: 'testpass',
        name: 'testname',
      });
    });

    it('should return null if user is not found', async () => {
      const res = await authService.validateUser({
        email: 'non existing email',
        password: 'testpass',
      });

      expect(res).toBeNull();
    });

    it('should return null if password does not match', async () => {
      const res = await authService.validateUser({
        email: user.email,
        password: 'wrong password',
      });

      expect(res).toBeNull();
    });

    it('should return user object excluding password field if user is found and password matches', async () => {
      const res = await authService.validateUser({
        email: user.email,
        password: 'testpass',
      });

      // Verify that password is hashed
      expect(user.password).not.toEqual('testpass');

      expect(res).toEqual({
        uid: user.uid,
        email: user.email,
        name: user.name,
        accountType: user.accountType,
      });
    });
  });
});
