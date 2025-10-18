import { prisma } from '../config/prisma';
import { User, Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';

type SafeUser = Omit<User, 'password' | 'googleId'>;

export class UserService {
  /**
   * Get all users
   */
  async getAllUsers(): Promise<SafeUser[]> {
    return prisma.user.findMany({
      select: {
        id: true,
        email: true,
        nom: true,
        urlAvatar: true,
        dateInscription: true,
        createdAt: true,
        updatedAt: true,
        preferences: true,
      },
    }) as Promise<SafeUser[]>;
  }

  /**
   * Get user by ID
   */
  async getUserById(id: string): Promise<SafeUser | null> {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        nom: true,
        urlAvatar: true,
        dateInscription: true,
        createdAt: true,
        updatedAt: true,
        preferences: true,
      },
    }) as Promise<SafeUser | null>;
  }

  /**
   * Get user by email
   */
  async getUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  /**
   * Create new user
   */
  async createUser(data: Prisma.UserCreateInput): Promise<SafeUser> {
    // Hash password if provided
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return prisma.user.create({
      data,
      select: {
        id: true,
        email: true,
        nom: true,
        urlAvatar: true,
        dateInscription: true,
        createdAt: true,
        updatedAt: true,
        preferences: true,
      },
    }) as Promise<SafeUser>;
  }

  /**
   * Update user
   */
  async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<SafeUser> {
    // Hash password if being updated
    if (data.password && typeof data.password === 'string') {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        nom: true,
        urlAvatar: true,
        dateInscription: true,
        createdAt: true,
        updatedAt: true,
        preferences: true,
      },
    }) as Promise<SafeUser>;
  }

  /**
   * Delete user
   */
  async deleteUser(id: string): Promise<SafeUser> {
    return prisma.user.delete({
      where: { id },
      select: {
        id: true,
        email: true,
        nom: true,
        urlAvatar: true,
        dateInscription: true,
        createdAt: true,
        updatedAt: true,
        preferences: true,
      },
    }) as Promise<SafeUser>;
  }

  /**
   * Get user with documents
   */
  async getUserWithDocuments(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        documents: true,
        dossiers: true,
        notifications: {
          where: { lu: false },
          orderBy: { dateCreation: 'desc' },
          take: 10,
        },
      },
    });
  }

  /**
   * Verify user password
   */
  async verifyPassword(email: string, password: string): Promise<boolean> {
    const user = await this.getUserByEmail(email);
    if (!user || !user.password) return false;
    return bcrypt.compare(password, user.password);
  }
}

export const userService = new UserService();
