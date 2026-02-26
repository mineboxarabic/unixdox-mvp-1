import { test, expect } from './fixtures/auth';

test.describe('Help Page', () => {
  test('Help page loads for authenticated user', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/help');
    
    await expect(authenticatedPage.getByRole('heading', { name: 'Centre d\'Aide' })).toBeVisible();
  });

  test('Help page shows help topics/categories', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/help');
    
    // Use heading role to match card titles specifically
    await expect(authenticatedPage.getByRole('heading', { name: 'Documents' })).toBeVisible();
    await expect(authenticatedPage.getByRole('heading', { name: 'Démarches' })).toBeVisible();
    await expect(authenticatedPage.getByRole('heading', { name: 'Échéances' })).toBeVisible();
    await expect(authenticatedPage.getByRole('heading', { name: 'Recherche' })).toBeVisible();
    await expect(authenticatedPage.getByRole('heading', { name: 'Paramètres' })).toBeVisible();
    await expect(authenticatedPage.getByRole('heading', { name: 'Premium & Admin' })).toBeVisible();
  });

  test('Contact support option is visible', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/help');
    
    await expect(authenticatedPage.getByText('Besoin d\'aide supplémentaire ?')).toBeVisible();
    await expect(authenticatedPage.getByText('support@unidox.app')).toBeVisible();
  });

  test('FAQ section is present', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/help');
    
    await expect(authenticatedPage.getByText('Comment uploader un document ?')).toBeVisible();
    await expect(authenticatedPage.getByText('Comment créer une nouvelle démarche ?')).toBeVisible();
  });
});
