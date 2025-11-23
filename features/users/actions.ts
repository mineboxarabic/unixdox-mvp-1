'use server';

import { revalidatePath } from 'next/cache';
import { userService } from './services/user.service';
import { UserUpdateSchema } from './types/schemas';
import { ActionResult } from '@/types/actions';
import { requireAuth } from '@/features/auth/server';
import { User, SubscriptionPlan } from '@prisma/client';

// Define SafeUser type locally or import if exported from service
type SafeUser = Omit<User, 'password' | 'googleId'>;

// Note: User creation is typically handled by Auth provider (NextAuth) or a specific registration flow.
// If you need an admin action to create users, you can add it here.

export async function updateCurrentUser(input: unknown): Promise<ActionResult<SafeUser>> {
  const session = await requireAuth();
  const userId = session.user?.id;

  if (!userId) {
    return { success: false, error: 'Unauthorized' };
  }

  const parsed = UserUpdateSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: 'Validation failed',
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    const updated = await userService.updateUser(userId, parsed.data as any);
    revalidatePath('/profile');
    return { success: true, data: updated };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to update user' };
  }
}

export async function deleteCurrentUser(): Promise<ActionResult<void>> {
  const session = await requireAuth();
  const userId = session.user?.id;

  if (!userId) {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    await userService.deleteUser(userId);
    // Redirect or sign out logic should be handled by the client after success
    return { success: true, data: undefined };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to delete user' };
  }
}

export async function updateUserSubscription(plan: SubscriptionPlan): Promise<ActionResult<SafeUser>> {
  const session = await requireAuth();
  const userId = session.user?.id;

  if (!userId) {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    const updated = await userService.updateUser(userId, { plan });
    revalidatePath('/profile');
    return { success: true, data: updated };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to update subscription' };
  }
}
