import { PrismaClient, DemarcheCategorie, DemarcheStatut } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Demo data seeder - creates realistic French administrative data for demonstrations.
 * Can optionally target a specific user by passing their email as argument.
 * 
 * Usage:
 *   npx tsx prisma/seed-demo.ts                    # Seeds for first available user
 *   npx tsx prisma/seed-demo.ts user@example.com   # Seeds for specific user
 */

// ==================== DEMO DATA DEFINITIONS ====================

/**
 * Modèles de démarches administratives réalistes
 */
const MODELES_DEMARCHES = [
  {
    titre: 'Demande AAH (Allocation Adulte Handicapé)',
    description: 'Demande d\'allocation pour adulte en situation de handicap auprès de la MDPH',
    typesDocumentsRequis: ['CARTE_IDENTITE', 'JUSTIFICATIF_DOMICILE', 'ATTESTATION_TRAVAIL', 'FICHE_PAIE'],
    categorie: DemarcheCategorie.ADMINISTRATIF,
    actif: true,
    ordre: 1,
  },
  {
    titre: 'Demande de visa Schengen',
    description: 'Demande de visa court séjour pour l\'espace Schengen',
    typesDocumentsRequis: ['PASSEPORT', 'JUSTIFICATIF_DOMICILE', 'RELEVE_BANCAIRE', 'ASSURANCE'],
    categorie: DemarcheCategorie.ADMINISTRATIF,
    actif: true,
    ordre: 2,
  },
  {
    titre: 'Aide au logement CAF (APL)',
    description: 'Demande d\'aide personnalisée au logement',
    typesDocumentsRequis: ['CARTE_IDENTITE', 'JUSTIFICATIF_DOMICILE', 'FICHE_PAIE', 'CONTRAT'],
    categorie: DemarcheCategorie.FINANCIER,
    actif: true,
    ordre: 3,
  },
  {
    titre: 'Création auto-entreprise',
    description: 'Création d\'une micro-entreprise auprès de l\'URSSAF',
    typesDocumentsRequis: ['CARTE_IDENTITE', 'JUSTIFICATIF_DOMICILE'],
    categorie: DemarcheCategorie.JURIDIQUE,
    actif: true,
    ordre: 4,
  },
  {
    titre: 'Renouvellement permis de conduire',
    description: 'Demande de renouvellement du permis de conduire',
    typesDocumentsRequis: ['CARTE_IDENTITE', 'JUSTIFICATIF_DOMICILE', 'PERMIS_CONDUIRE'],
    categorie: DemarcheCategorie.ADMINISTRATIF,
    actif: true,
    ordre: 5,
  },
  {
    titre: 'Inscription Pôle Emploi',
    description: 'Inscription en tant que demandeur d\'emploi',
    typesDocumentsRequis: ['CARTE_IDENTITE', 'ATTESTATION_TRAVAIL', 'FICHE_PAIE'],
    categorie: DemarcheCategorie.ADMINISTRATIF,
    actif: true,
    ordre: 6,
  },
  {
    titre: 'Demande de RSA',
    description: 'Demande de Revenu de Solidarité Active',
    typesDocumentsRequis: ['CARTE_IDENTITE', 'JUSTIFICATIF_DOMICILE', 'RELEVE_BANCAIRE'],
    categorie: DemarcheCategorie.FINANCIER,
    actif: true,
    ordre: 7,
  },
  {
    titre: 'Location d\'appartement',
    description: 'Constitution du dossier locataire',
    typesDocumentsRequis: ['CARTE_IDENTITE', 'JUSTIFICATIF_DOMICILE', 'FICHE_PAIE', 'CONTRAT', 'RELEVE_BANCAIRE'],
    categorie: DemarcheCategorie.PERSONNEL,
    actif: true,
    ordre: 8,
  },
];

/**
 * Tags pour organiser les documents
 */
const TAGS = [
  'important',
  'urgent',
  'personnel',
  'travail',
  'logement',
  'santé',
  'finances',
  'voyage',
  'éducation',
  'famille',
];

/**
 * Dossiers pour organiser les documents (with nice colors)
 */
const DOSSIERS = [
  { nom: 'Documents Personnels', couleur: '#2f45ff', icone: 'user' },
  { nom: 'Travail', couleur: '#10B981', icone: 'briefcase' },
  { nom: 'Logement', couleur: '#F59E0B', icone: 'home' },
  { nom: 'Santé', couleur: '#EF4444', icone: 'heart' },
  { nom: 'Finances', couleur: '#8B5CF6', icone: 'credit-card' },
  { nom: 'Voyages', couleur: '#EC4899', icone: 'plane' },
];

// ==================== SEEDING FUNCTIONS ====================

async function seedTags() {
  console.log('🏷️  Creating tags...');
  
  for (const tagName of TAGS) {
    await prisma.tag.upsert({
      where: { name: tagName },
      update: {},
      create: { name: tagName },
    });
  }
  
  console.log(`✅ Created ${TAGS.length} tags`);
}

async function seedModelesDemarches() {
  console.log('📋 Creating modèles de démarches...');
  
  for (const modele of MODELES_DEMARCHES) {
    await prisma.modeleDemarche.upsert({
      where: { titre: modele.titre },
      update: modele,
      create: modele,
    });
  }
  
  console.log(`✅ Created/updated ${MODELES_DEMARCHES.length} modèles de démarches`);
}

async function seedDossiers(userId: string) {
  console.log('📁 Creating dossiers...');

  // Remove any existing demo dossiers for this user to avoid duplicates on re-run
  await prisma.dossier.deleteMany({ where: { idProprietaire: userId } });

  const createdDossiers = [];
  for (const dossier of DOSSIERS) {
    const created = await prisma.dossier.create({
      data: {
        idProprietaire: userId,
        nom: dossier.nom,
        couleur: dossier.couleur,
        icone: dossier.icone,
      },
    });
    createdDossiers.push(created);
  }

  console.log(`✅ Created ${createdDossiers.length} dossiers`);
  return createdDossiers;
}

async function seedDemarchesUtilisateur(userId: string) {
  console.log('📝 Creating user démarches...');

  // Remove existing user démarches to avoid duplicates on re-run
  await prisma.demarcheUtilisateur.deleteMany({ where: { idUtilisateur: userId } });

  const modeles = await prisma.modeleDemarche.findMany();
  let createdCount = 0;
  
  // Create varied démarches with different statuses
  const demarchesToCreate = [
    // En cours - recently started
    { modeleIndex: 0, statut: DemarcheStatut.EN_COURS, daysAgo: 5, notes: 'Dossier en cours de constitution' },
    { modeleIndex: 2, statut: DemarcheStatut.EN_COURS, daysAgo: 15, notes: 'En attente de réponse du bailleur' },
    { modeleIndex: 7, statut: DemarcheStatut.EN_COURS, daysAgo: 3, notes: 'Documents à rassembler' },
    
    // Complète - finished ones
    { modeleIndex: 4, statut: DemarcheStatut.COMPLETE, daysAgo: 45, completedDaysAgo: 10, notes: 'Permis renouvelé avec succès' },
    { modeleIndex: 3, statut: DemarcheStatut.COMPLETE, daysAgo: 90, completedDaysAgo: 60, notes: 'Auto-entreprise créée' },
    
    // Abandonnée - gave up on this one
    { modeleIndex: 1, statut: DemarcheStatut.ABANDONNEE, daysAgo: 120, notes: 'Voyage annulé' },
  ];
  
  for (const demarche of demarchesToCreate) {
    if (modeles[demarche.modeleIndex]) {
      const dateDebut = new Date(Date.now() - demarche.daysAgo * 24 * 60 * 60 * 1000);
      const dateCompletion = demarche.completedDaysAgo 
        ? new Date(Date.now() - demarche.completedDaysAgo * 24 * 60 * 60 * 1000)
        : null;
      
      await prisma.demarcheUtilisateur.create({
        data: {
          idUtilisateur: userId,
          idModele: modeles[demarche.modeleIndex].id,
          statut: demarche.statut,
          complete: demarche.statut === DemarcheStatut.COMPLETE,
          dateDebut,
          dateCompletion,
          notes: demarche.notes,
        },
      });
      createdCount++;
    }
  }
  
  console.log(`✅ Created ${createdCount} user démarches`);
}

// ==================== MAIN FUNCTION ====================

async function seedDemo() {
  console.log('🌱 Starting demo data seeding...\n');

  // Get target user
  const emailArg = process.argv[2];
  let user;
  
  if (emailArg) {
    user = await prisma.user.findUnique({ where: { email: emailArg } });
    if (!user) {
      console.error(`❌ User with email "${emailArg}" not found.`);
      process.exit(1);
    }
  } else {
    user = await prisma.user.findFirst();
    if (!user) {
      console.error('❌ No users found in database. Please create a user first.');
      process.exit(1);
    }
  }
  
  console.log(`👤 Seeding demo data for user: ${user.email || user.name || user.id}\n`);

  // Seed data
  await seedTags();
  await seedModelesDemarches();
  await seedDossiers(user.id);
  await seedDemarchesUtilisateur(user.id);

  console.log('\n✨ Demo seeding complete!');
  console.log('ℹ️  You can now run the app and explore the demo data.');
}

async function main() {
  try {
    await seedDemo();
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
