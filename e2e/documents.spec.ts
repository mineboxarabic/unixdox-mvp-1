import { test, expect } from './fixtures/auth';

test.describe('Documents Page', () => {
  test('should load documents page for authenticated user', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/documents');
    
    await expect(authenticatedPage.getByRole('heading', { name: 'Mes Documents' })).toBeVisible();
    // Check breadcrumb contains "Documents" and "Mes documents"
    await expect(authenticatedPage.getByRole('main').getByText('Documents').first()).toBeVisible();
    await expect(authenticatedPage.getByRole('main').getByText('Mes documents').first()).toBeVisible();
  });

  test('should show empty state when no documents exist', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/documents');
    
    await expect(authenticatedPage.getByText('Aucun document trouvé')).toBeVisible();
    await expect(authenticatedPage.getByText('Commencez par ajouter votre premier document')).toBeVisible();
  });

  test('should display upload button', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/documents');
    
    await expect(authenticatedPage.getByRole('button', { name: /Ajouter un document/i })).toBeVisible();
  });

  test('should show document list/grid when documents exist', async ({ authenticatedPage, testUser }) => {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    
    await prisma.document.create({
      data: {
        idProprietaire: testUser.id,
        nomFichier: 'Test Document.pdf',
        type: 'FICHE_PAIE',
        statut: 'VERIFIE',
        urlStockage: 'https://example.com/test.pdf',
        size: 1024,
        dateUpload: new Date(),
      }
    });
    
    await authenticatedPage.goto('/documents');
    
    await expect(authenticatedPage.getByText('Test Document.pdf')).toBeVisible();
  });

  test('should show clear filters button when filters are active', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/documents?type=FICHE_PAIE');
    
    await expect(authenticatedPage.getByRole('button', { name: /Effacer les filtres/i })).toBeVisible();
  });
});
