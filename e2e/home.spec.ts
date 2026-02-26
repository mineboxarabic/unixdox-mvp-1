import { test, expect } from './fixtures/auth';

test.describe('Home Page', () => {
  test('Authenticated user can access home page', async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    await page.goto('/');
    await expect(page.getByText('Bienvenue sur Unidox')).toBeVisible({ timeout: 10000 });
  });

  test('Home page shows recent documents', async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    await page.goto('/');
    await expect(page.getByText(/Documents récents/i)).toBeVisible();
  });

  test('Home page shows dossiers recents', async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    await page.goto('/');
    await expect(page.getByText(/Dossiers récents/i)).toBeVisible();
  });

  test('Home page shows add document button', async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    await page.goto('/');
    await expect(page.getByRole('button', { name: /Ajouter un document/i })).toBeVisible();
  });
});
