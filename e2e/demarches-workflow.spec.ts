import { test, expect } from './fixtures/auth';
import { PrismaClient, DemarcheStatut, DemarcheCategorie } from '@prisma/client';

const prisma = new PrismaClient();

test.describe('Demarches Page', () => {
  test('should load demarches page for authenticated user', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/demarches');
    
    await expect(authenticatedPage.getByRole('heading', { name: 'Démarches' })).toBeVisible();
    // Breadcrumb shows "Démarches" with > separator
    await expect(authenticatedPage.getByText('Démarches').first()).toBeVisible();
  });

  test('should show empty state when no demarches exist', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/demarches');
    
    await expect(authenticatedPage.getByText('Aucune démarche trouvée')).toBeVisible();
    await expect(authenticatedPage.getByText('Commencez une nouvelle démarche pour organiser vos documents administratifs')).toBeVisible();
  });

  test('should display start demarche button', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/demarches');
    
    await expect(authenticatedPage.getByRole('button', { name: /Commencer une démarche/i })).toBeVisible();
  });

  test('should show list of user demarches', async ({ authenticatedPage, testUser }) => {
    const modeles = await prisma.modeleDemarche.findMany({ where: { actif: true } });
    
    if (modeles.length > 0) {
      await prisma.demarcheUtilisateur.create({
        data: {
          idUtilisateur: testUser.id,
          idModele: modeles[0].id,
          statut: DemarcheStatut.EN_COURS,
          complete: false,
          dateDebut: new Date(),
          notes: 'Test demarche',
        }
      });

      await authenticatedPage.goto('/demarches');
      
      await expect(authenticatedPage.getByText(modeles[0].titre)).toBeVisible();
      await expect(authenticatedPage.getByText('En cours')).toBeVisible();
    }
  });
});

test.describe('Create Demarche Dialog', () => {
  test('should open create demarche dialog', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/demarches');
    
    await authenticatedPage.getByRole('button', { name: /Commencer une démarche/i }).click();
    
    await expect(authenticatedPage.getByRole('dialog')).toBeVisible();
    await expect(authenticatedPage.getByText("Création d'un dossier de démarche")).toBeVisible();
  });

  test('should search and select a template', async ({ authenticatedPage }) => {
    const modeles = await prisma.modeleDemarche.findMany({ where: { actif: true }, take: 1 });
    
    if (modeles.length === 0) {
      await prisma.modeleDemarche.create({
        data: {
          titre: 'Test Demarche Template',
          description: 'Test description',
          typesDocumentsRequis: ['CARTE_IDENTITE'],
          categorie: DemarcheCategorie.ADMINISTRATIF,
          actif: true,
          ordre: 1,
        }
      });
    }
    
    await authenticatedPage.goto('/demarches');
    await authenticatedPage.getByRole('button', { name: /Commencer une démarche/i }).click();
    
    const searchInput = authenticatedPage.getByPlaceholder(/Rechercher une démarche/i);
    await expect(searchInput).toBeVisible();
    
    await searchInput.fill('Test');
    
    await authenticatedPage.waitForTimeout(500);
    
    const template = authenticatedPage.getByText('Test Demarche Template').first();
    if (await template.isVisible()) {
      await template.click();
      
      await expect(authenticatedPage.getByText('Test Demarche Template')).toBeVisible();
    }
  });

  test('should close dialog when cancel is clicked', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/demarches');
    
    await authenticatedPage.getByRole('button', { name: /Commencer une démarche/i }).click();
    
    await expect(authenticatedPage.getByRole('dialog')).toBeVisible();
    
    await authenticatedPage.getByRole('button', { name: /Annuler/i }).click();
    
    await expect(authenticatedPage.getByRole('dialog')).toBeHidden();
  });
});

test.describe('Demarche Details Page', () => {
  let createdDemarcheId: string | undefined;

  test.afterEach(async () => {
    if (createdDemarcheId) {
      await prisma.demarcheUtilisateur.deleteMany({ where: { id: createdDemarcheId } });
      createdDemarcheId = undefined;
    }
  });

  test('should show demarche details', async ({ authenticatedPage, testUser }) => {
    const modeles = await prisma.modeleDemarche.findMany({ where: { actif: true }, take: 1 });
    
    expect(modeles.length).toBeGreaterThan(0);
    
    const demarche = await prisma.demarcheUtilisateur.create({
      data: {
        idUtilisateur: testUser.id,
        idModele: modeles[0].id,
        statut: DemarcheStatut.EN_COURS,
        complete: false,
        dateDebut: new Date(),
        notes: 'Test demarche for details',
      },
      include: {
        modele: true
      }
    });
    
    createdDemarcheId = demarche.id;
    
    await authenticatedPage.goto(`/demarches/${demarche.id}`);
    
    await expect(authenticatedPage.getByText('Documents requis')).toBeVisible();
    await expect(authenticatedPage.getByText('Progression des documents')).toBeVisible();
    await expect(authenticatedPage.getByText(/Retour aux démarches/)).toBeVisible();
  });

  test('should show document requirements in details', async ({ authenticatedPage, testUser }) => {
    const modeles = await prisma.modeleDemarche.findMany({ 
      where: { 
        actif: true,
        typesDocumentsRequis: {
          isEmpty: false
        }
      },
      take: 1
    });
    
    if (modeles.length > 0) {
      const demarche = await prisma.demarcheUtilisateur.create({
        data: {
          idUtilisateur: testUser.id,
          idModele: modeles[0].id,
          statut: DemarcheStatut.EN_COURS,
          complete: false,
          dateDebut: new Date(),
        },
        include: {
          modele: true
        }
      });
      
      createdDemarcheId = demarche.id;
      
      await authenticatedPage.goto(`/demarches/${demarche.id}`);
      
      const requiredDoc = modeles[0].typesDocumentsRequis[0];
      await expect(authenticatedPage.getByText(requiredDoc)).toBeVisible();
    }
  });

  test('should navigate back to demarches list from details', async ({ authenticatedPage, testUser }) => {
    const modeles = await prisma.modeleDemarche.findMany({ where: { actif: true }, take: 1 });
    
    if (modeles.length > 0) {
      const demarche = await prisma.demarcheUtilisateur.create({
        data: {
          idUtilisateur: testUser.id,
          idModele: modeles[0].id,
          statut: DemarcheStatut.EN_COURS,
          complete: false,
          dateDebut: new Date(),
        }
      });
      
      createdDemarcheId = demarche.id;
      
      await authenticatedPage.goto(`/demarches/${demarche.id}`);
      
      await authenticatedPage.getByText(/Retour aux démarches/).click();
      
      await expect(authenticatedPage).toHaveURL('/demarches');
    }
  });
});
