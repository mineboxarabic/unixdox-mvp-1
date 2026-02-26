/**
 * Script to set or remove admin role for a user by email
 *
 * Usage:
 *   npx tsx scripts/make-admin.ts <email> [set|remove]
 *
 * Examples:
 *   npx tsx scripts/make-admin.ts user@example.com set     # Make admin
 *   npx tsx scripts/make-admin.ts user@example.com remove  # Remove admin
 *   npx tsx scripts/make-admin.ts user@example.com         # Toggle (default)
 */

import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function makeAdmin(email: string, action?: 'set' | 'remove') {
    try {
        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true, email: true, role: true },
        });

        if (!user) {
            console.error(`❌ User not found: ${email}`);
            process.exit(1);
        }

        const isAdmin = user.role === UserRole.ADMIN;

        // Determine new role based on action or toggle
        let newRole: UserRole;
        if (action === 'set') {
            newRole = UserRole.ADMIN;
        } else if (action === 'remove') {
            newRole = UserRole.USER;
        } else {
            // Toggle
            newRole = isAdmin ? UserRole.USER : UserRole.ADMIN;
        }

        // Update user role
        const updatedUser = await prisma.user.update({
            where: { email },
            data: { role: newRole },
            select: { email: true, role: true },
        });

        const emoji = updatedUser.role === UserRole.ADMIN ? '✅' : '🔽';
        console.log(`${emoji} Updated role for ${updatedUser.email}: ${user.role} → ${updatedUser.role}`);
    } catch (error) {
        console.error('❌ Error updating user role:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

// Parse CLI arguments
const [, , email, action] = process.argv;

if (!email) {
    console.error('Usage: npx tsx scripts/make-admin.ts <email> [set|remove]');
    process.exit(1);
}

if (action && action !== 'set' && action !== 'remove') {
    console.error('Action must be "set" or "remove"');
    process.exit(1);
}

makeAdmin(email, action as 'set' | 'remove' | undefined);
