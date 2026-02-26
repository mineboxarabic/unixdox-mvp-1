import { test, expect } from './fixtures/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

test.describe('Settings Page', () => {
  test('Settings page loads for authenticated user', async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    await page.goto('/settings');
    await expect(page.getByRole('heading', { name: 'Paramètres' })).toBeVisible({ timeout: 15000 });
  });

  test('User can see notification settings', async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    await page.goto('/settings');
    await expect(page.getByRole('heading', { name: 'Notifications' })).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Notifications par e-mail')).toBeVisible();
    await expect(page.getByText('Notifications par SMS')).toBeVisible();
    await expect(page.getByText('Notifications in-app')).toBeVisible();
  });

  test('User can see account settings', async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    await page.goto('/settings');
    await expect(page.getByRole('heading', { name: 'Compte' })).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Supprimer mon compte')).toBeVisible();
  });

  test('Language preference selector exists', async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    await page.goto('/settings');
    await expect(page.getByRole('heading', { name: 'Langue' })).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole('button', { name: 'Français' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'English' })).toBeVisible();
  });

  test('Free user sees subscription section with upgrade button', async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    await page.goto('/settings');
    await expect(page.getByRole('heading', { name: 'Abonnement' })).toBeVisible({ timeout: 15000 });
    await expect(page.getByTestId('plan-badge')).toContainText('Gratuit');
    await expect(page.getByTestId('upgrade-settings-btn')).toBeVisible();
  });

  test('Premium user can unsubscribe from settings', async ({ authenticatedPage, testUser }) => {
    // Upgrade user to PREMIUM directly in DB (dev/test approach)
    await prisma.user.update({
      where: { id: testUser.id },
      data: { plan: 'PREMIUM' },
    });

    const page = authenticatedPage;
    await page.goto('/settings');
    await expect(page.getByRole('heading', { name: 'Abonnement' })).toBeVisible({ timeout: 15000 });

    // Should show Premium badge and unsubscribe button
    await expect(page.getByTestId('plan-badge')).toContainText('Premium');
    await expect(page.getByTestId('unsubscribe-btn')).toBeVisible();

    // Click unsubscribe
    await page.getByTestId('unsubscribe-btn').click();

    // After unsubscribe, should show Gratuit badge and upgrade button
    await expect(page.getByTestId('plan-badge')).toContainText('Gratuit', { timeout: 10000 });
    await expect(page.getByTestId('upgrade-settings-btn')).toBeVisible();
  });
});

