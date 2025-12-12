/**
 * Script to toggle premium status for a user by email
 * 
 * Usage:
 *   npx tsx scripts/toggle-premium.ts <email> [set|remove]
 * 
 * Examples:
 *   npx tsx scripts/toggle-premium.ts user@example.com set     # Make premium
 *   npx tsx scripts/toggle-premium.ts user@example.com remove  # Remove premium
 *   npx tsx scripts/toggle-premium.ts user@example.com         # Toggle (default)
 */

import { PrismaClient, SubscriptionPlan } from '@prisma/client';

const prisma = new PrismaClient();

async function togglePremium(email: string, action?: 'set' | 'remove') {
    try {
        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true, email: true, plan: true },
        });

        if (!user) {
            console.error(`❌ User not found: ${email}`);
            process.exit(1);
        }

        const currentPlan = user.plan;
        const isPremium = currentPlan === 'PREMIUM' || currentPlan === 'ENTERPRISE';

        // Determine new plan based on action or toggle
        let newPlan: SubscriptionPlan;
        if (action === 'set') {
            newPlan = SubscriptionPlan.PREMIUM;
        } else if (action === 'remove') {
            newPlan = SubscriptionPlan.FREE;
        } else {
            // Toggle
            newPlan = isPremium ? SubscriptionPlan.FREE : SubscriptionPlan.PREMIUM;
        }

        // Update user plan
        const updatedUser = await prisma.user.update({
            where: { email },
            data: { plan: newPlan },
            select: { email: true, plan: true },
        });

        console.log(`\n✅ User updated successfully!`);
        console.log(`   Email: ${updatedUser.email}`);
        console.log(`   Previous plan: ${currentPlan}`);
        console.log(`   New plan: ${updatedUser.plan}`);
        console.log(`   Premium: ${updatedUser.plan === 'PREMIUM' || updatedUser.plan === 'ENTERPRISE' ? '✓' : '✗'}\n`);

    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

// Parse command line arguments
const args = process.argv.slice(2);
const email = args[0];
const action = args[1] as 'set' | 'remove' | undefined;

if (!email) {
    console.log(`
Usage: npx tsx scripts/toggle-premium.ts <email> [set|remove]

Examples:
  npx tsx scripts/toggle-premium.ts user@example.com set     # Make premium
  npx tsx scripts/toggle-premium.ts user@example.com remove  # Remove premium
  npx tsx scripts/toggle-premium.ts user@example.com         # Toggle
  `);
    process.exit(1);
}

if (action && action !== 'set' && action !== 'remove') {
    console.error(`❌ Invalid action: ${action}. Use 'set' or 'remove'.`);
    process.exit(1);
}

togglePremium(email, action);
