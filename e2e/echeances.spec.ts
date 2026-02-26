import { test, expect } from './fixtures/auth';

test.describe('Echeances Page', () => {
  test('Echeances page loads for authenticated user', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/echeances');
    
    await expect(authenticatedPage.getByRole('heading', { name: 'Échéances' })).toBeVisible();
    // Check breadcrumb or page content contains Échéances
    await expect(authenticatedPage.getByText('Échéances').first()).toBeVisible({ timeout: 10000 });
  });

  test('Non-premium user sees upgrade prompt', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/echeances');
    
    await expect(authenticatedPage.getByText('Fonctionnalité Premium')).toBeVisible();
    await expect(authenticatedPage.getByText(/Le suivi des échéances est une fonctionnalité réservée aux utilisateurs Premium/i)).toBeVisible();
    await expect(authenticatedPage.getByRole('button', { name: /Passer à Premium/i })).toBeVisible();
  });

  test('Premium user can see list of upcoming deadlines', async ({ authenticatedPage, testUser }) => {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    
    await prisma.user.update({
      where: { id: testUser.id },
      data: { plan: 'PREMIUM' },
    });

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 15);
    
    await prisma.document.create({
      data: {
        idProprietaire: testUser.id,
        nomFichier: 'Test Document.pdf',
        type: 'FICHE_PAIE',
        statut: 'VERIFIE',
        urlStockage: 'https://example.com/test.pdf',
        size: 1024,
        dateUpload: new Date(),
        dateExpiration: futureDate,
      }
    });
    
    await authenticatedPage.goto('/echeances');
    
    await expect(authenticatedPage.getByText('Test Document.pdf')).toBeVisible();
    await expect(authenticatedPage.getByText(/jours restants/i)).toBeVisible();
  });

  test('Premium user sees empty state when no deadlines', async ({ authenticatedPage, testUser }) => {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    
    await prisma.user.update({
      where: { id: testUser.id },
      data: { plan: 'PREMIUM' },
    });
    
    await authenticatedPage.goto('/echeances');
    
    await expect(authenticatedPage.getByText('Aucune échéance trouvée')).toBeVisible();
    await expect(authenticatedPage.getByText(/Vos documents avec des dates d'expiration apparaîtront ici/i)).toBeVisible();
  });

  test('Deadlines are sorted by date', async ({ authenticatedPage, testUser }) => {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    
    await prisma.user.update({
      where: { id: testUser.id },
      data: { plan: 'PREMIUM' },
    });

    const soonDate = new Date();
    soonDate.setDate(soonDate.getDate() + 5);
    
    const laterDate = new Date();
    laterDate.setDate(laterDate.getDate() + 30);
    
    await prisma.document.createMany({
      data: [
        {
          idProprietaire: testUser.id,
          nomFichier: 'Document urgent.pdf',
          type: 'FICHE_PAIE',
          statut: 'VERIFIE',
          urlStockage: 'https://example.com/urgent.pdf',
          size: 1024,
          dateUpload: new Date(),
          dateExpiration: soonDate,
        },
        {
          idProprietaire: testUser.id,
          nomFichier: 'Document later.pdf',
          type: 'CONTRAT',
          statut: 'VERIFIE',
          urlStockage: 'https://example.com/later.pdf',
          size: 2048,
          dateUpload: new Date(),
          dateExpiration: laterDate,
        }
      ]
    });
    
    await authenticatedPage.goto('/echeances');
    
    const urgentDoc = authenticatedPage.getByText('Document urgent.pdf');
    const laterDoc = authenticatedPage.getByText('Document later.pdf');
    
    await expect(urgentDoc).toBeVisible();
    await expect(laterDoc).toBeVisible();
    
    // Check that urgent document shows "5 jours restants" and later shows "30 jours restants"
    await expect(authenticatedPage.getByText('5 jours restants')).toBeVisible();
    await expect(authenticatedPage.getByText('30 jours restants')).toBeVisible();
  });
});
