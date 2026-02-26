import { test, expect } from './fixtures/auth';

test.describe('Login Page', () => {
  test('Unauthenticated user is redirected to login when visiting /', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/.*\/login/);
  });

  test('Login page shows Google sign in button', async ({ page }) => {
    await page.goto('/login');
    const googleBtn = page.getByRole('button', { name: /Se connecter avec Google/i });
    await expect(googleBtn).toBeVisible();
  });

  test('Login page has proper title', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: 'Connexion' })).toBeVisible();
    await expect(page.getByText('Retrouvez votre assistant administratif personnel')).toBeVisible();
  });

});
