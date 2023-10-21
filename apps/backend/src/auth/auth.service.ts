import { Injectable } from '@nestjs/common';

import { UserService } from '@/auth/user.service';
import { exclude } from '@/utils/objects';
import type { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  /**
   * Validates a user by checking if the email and password match with an existing user in the database.
   * If the user is found and the password matches, the method returns the user object excluding the password field.
   * If the user is not found or the password does not match, null is returned.
   *
   * @param {Object} userObj - An object containing the email and password of the user.
   * @param {string} userObj.email - The email of the user.
   * @param {string} userObj.password - The password of the user.
   *
   * @returns {Promise<Object | null>} - A promise that resolves to the user object excluding the password field, or null if no user found or password does not match.
   */
  async validateUser({
    email,
    password,
  }: Pick<User, 'email' | 'password'>): Promise<Omit<User, 'password'> | null> {
    const user = await this.userService.find({ email });

    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {
        return exclude(user, ['password']);
      }
    }

    return null;
  }
}
