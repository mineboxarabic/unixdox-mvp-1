'use server';

import { revalidatePath } from 'next/cache';
import { redirect, unstable_rethrow } from 'next/navigation';
import { userService } from './services/user.service';
import { UserUpdateSchema } from './types/schemas';
import { ActionResult } from '@/shared/types/actions';
import { requireAuth } from '@/shared/auth/server';
import { User, SubscriptionPlan } from '@prisma/client';

// Define SafeUser type locally or import if exported from service
type SafeUser = Omit<User, 'password' | 'googleId'>;

function toErrorMessage(error: unknown, fallback: string): string {
  return error instanceof Error && error.message ? error.message : fallback;
}

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
    const updated = await userService.updateUser(userId, parsed.data);
    if (!updated) {
     
      redirect('/login');
    }
    revalidatePath('/profile');
    return { success: true, data: updated };
  } catch (error: unknown) {
    unstable_rethrow(error);
    return { success: false, error: toErrorMessage(error, 'Failed to update user') };
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
  } catch (error: unknown) {
    unstable_rethrow(error);
    return { success: false, error: toErrorMessage(error, 'Failed to delete user') };
  }
}

export async function updateUserSubscription(plan: SubscriptionPlan): Promise<ActionResult<SafeUser>> {
  const session = await requireAuth();
  const userId = session.user?.id;

  console.log('updateUserSubscription called with userId:', userId, 'plan:', plan);

  if (!userId) {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    const updated = await userService.updateUser(userId, { plan });
    if (!updated) {
      redirect('/login');
    }
    revalidatePath('/profile');
    return { success: true, data: updated };
  } catch (error: unknown) {
    unstable_rethrow(error);
    console.error('Error in updateUserSubscription:', error);
    return { success: false, error: toErrorMessage(error, 'Failed to update subscription') };
  }
}
