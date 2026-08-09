import { Prisma, User } from '../../generated/prisma/client.js';
import { prisma } from '../../config/db.js';

export class AuthRepository {
  /** Create a new user */
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({ data });
  }

  /** Find a user by a unique identifier (id or phoneNumber) */
  async findUnique(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return prisma.user.findUnique({ where });
  }

  /** Find a user by phone number – useful for login */
  async findByPhone(phoneNumber: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { phoneNumber } });
  }
}

export const authRepository = new AuthRepository();
