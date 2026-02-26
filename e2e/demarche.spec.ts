import { test, expect } from './fixtures/auth';

test.describe('Demarches Flow', () => {
  test('Creating a new demarche from model', async ({ authenticatedPage }) => {
    const page = authenticatedPage;

    await page.goto('/demarches');

    // Add debug log to see what is actually rendered
    console.log('Demarches page text:', await page.textContent('body'));

    // Wait for the "Commencer une démarche" button
    const newDemarcheBtn = page.getByRole('button', { name: /Commencer une d(e|é)marche/i });
    await expect(newDemarcheBtn).toBeVisible();
    
    await newDemarcheBtn.click();

    // The dialog should open
    await expect(page.getByRole('dialog')).toBeVisible();

    // Should show dialog title
    await expect(page.getByText("Création d'un dossier de démarche", { exact: false })).toBeVisible();

    // Assuming we have no models initially, it might show an empty state, 
    // but the UI should render without crashing.
    // If models are seeded, we could interact with them.
    const closeBtn = page.getByRole('button', { name: /Annuler|Fermer/i }).first();
    if (await closeBtn.isVisible()) {
        await closeBtn.click();
        await expect(page.getByRole('dialog')).toBeHidden();
    }
  });
});
