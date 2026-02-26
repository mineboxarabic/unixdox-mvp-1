import { test, expect } from './fixtures/auth';

test.describe('Profile Page', () => {
  test('Profile page loads for authenticated user', async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    await page.goto('/profile');
    await expect(page.getByText('Mon Profil')).toBeVisible({ timeout: 10000 });
  });

  test('User can see their email', async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    await page.goto('/profile');
    // Check Email label - use exact match to avoid matching "L'adresse email..."
    await expect(page.getByRole('heading', { name: 'Mon Profil' })).toBeVisible();
    await expect(page.locator('label:has-text("Email"), p:has-text("Email")').first()).toBeVisible();
    // Email is shown in a read-only input field
    await expect(page.locator('input').nth(1)).toBeVisible();
  });

  test('Settings or edit profile button is visible', async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    await page.goto('/profile');
    const saveButton = page.getByRole('button', { name: /Sauvegarder|Enregistrer/i });
    await expect(saveButton).toBeVisible();
  });
});
