import { prisma } from '@/shared/config/prisma';
import { User, Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';

type SafeUser = Omit<User, 'password' | 'googleId'>;

class UserService {
  async getAllUsers(): Promise<SafeUser[]> {
    return prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        dateInscription: true,
        createdAt: true,
        updatedAt: true,
        preferences: true,
      },
    }) as unknown as Promise<SafeUser[]>;
  }

  async getUserById(id: string): Promise<SafeUser | null> {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        dateInscription: true,
        createdAt: true,
        updatedAt: true,
        preferences: true,
        onboardingCompleted: true,
      },
    }) as unknown as Promise<SafeUser | null>;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<SafeUser> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password as string, 10);
    }

    return prisma.user.create({
      data,
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        dateInscription: true,
        createdAt: true,
        updatedAt: true,
        preferences: true,
      },
    }) as unknown as Promise<SafeUser>;
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<SafeUser> {
    if (data.password && typeof data.password === 'string') {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        dateInscription: true,
        createdAt: true,
        updatedAt: true,
        preferences: true,
      },
    }) as unknown as Promise<SafeUser>;
  }

  async deleteUser(id: string): Promise<SafeUser> {
    return prisma.user.delete({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        dateInscription: true,
        createdAt: true,
        updatedAt: true,
        preferences: true,
      },
    }) as unknown as Promise<SafeUser>;
  }

  async getUserWithDocuments(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        documents: true,
        dossiers: true,
        notifications: { where: { lu: false }, orderBy: { dateCreation: 'desc' }, take: 10 },
      },
    });
  }

  async verifyPassword(email: string, password: string): Promise<boolean> {
    const user = await this.getUserByEmail(email);
    if (!user || !user.password) return false;
    return bcrypt.compare(password, user.password);
  }
}

export const userService = new UserService();
