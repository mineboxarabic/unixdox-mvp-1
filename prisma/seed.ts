/**
 * Main Prisma seeder — seeds global/reference data only (no user-specific data).
 *
 * Seeds:
 *  - Tags
 *  - ModeleDemarche (administrative procedure templates)
 *
 * Run:
 *   npx prisma db seed
 *   npm run db:seed
 *
 * For user-specific demo data use:
 *   npm run db:seed-demo [email]
 */

import { PrismaClient, DemarcheCategorie } from '@prisma/client';

const prisma = new PrismaClient();

// ─── Reference Data ──────────────────────────────────────────────────────────

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

const MODELES_DEMARCHES = [
  {
    titre: 'Demande AAH (Allocation Adulte Handicapé)',
    description: "Demande d'allocation pour adulte en situation de handicap auprès de la MDPH",
    typesDocumentsRequis: ['CARTE_IDENTITE', 'JUSTIFICATIF_DOMICILE', 'ATTESTATION_TRAVAIL', 'FICHE_PAIE'],
    categorie: DemarcheCategorie.ADMINISTRATIF,
    actif: true,
    ordre: 1,
  },
  {
    titre: 'Demande de visa Schengen',
    description: "Demande de visa court séjour pour l'espace Schengen",
    typesDocumentsRequis: ['PASSEPORT', 'JUSTIFICATIF_DOMICILE', 'RELEVE_BANCAIRE', 'ASSURANCE'],
    categorie: DemarcheCategorie.ADMINISTRATIF,
    actif: true,
    ordre: 2,
  },
  {
    titre: 'Aide au logement CAF (APL)',
    description: "Demande d'aide personnalisée au logement",
    typesDocumentsRequis: ['CARTE_IDENTITE', 'JUSTIFICATIF_DOMICILE', 'FICHE_PAIE', 'CONTRAT'],
    categorie: DemarcheCategorie.FINANCIER,
    actif: true,
    ordre: 3,
  },
  {
    titre: "Création auto-entreprise",
    description: "Création d'une micro-entreprise auprès de l'URSSAF",
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
    description: "Inscription en tant que demandeur d'emploi",
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
    titre: "Location d'appartement",
    description: 'Constitution du dossier locataire',
    typesDocumentsRequis: ['CARTE_IDENTITE', 'JUSTIFICATIF_DOMICILE', 'FICHE_PAIE', 'CONTRAT', 'RELEVE_BANCAIRE'],
    categorie: DemarcheCategorie.PERSONNEL,
    actif: true,
    ordre: 8,
  },
  {
    titre: 'Demande de visa suisse',
    description: 'Visa pour la Suisse',
    typesDocumentsRequis: ['PASSEPORT', 'JUSTIFICATIF_DOMICILE', 'RELEVE_BANCAIRE'],
    categorie: DemarcheCategorie.ADMINISTRATIF,
    actif: true,
    ordre: 9,
  },
  {
    titre: 'Location de locaux professionnels',
    description: 'Bail commercial',
    typesDocumentsRequis: ['CARTE_IDENTITE', 'JUSTIFICATIF_DOMICILE', 'RELEVE_BANCAIRE'],
    categorie: DemarcheCategorie.FINANCIER,
    actif: true,
    ordre: 10,
  },
];

// ─── Seed Functions ───────────────────────────────────────────────────────────

async function seedTags() {
  console.log('🏷️  Seeding tags...');
  for (const name of TAGS) {
    await prisma.tag.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
  console.log(`✅ ${TAGS.length} tags seeded`);
}

async function seedModelesDemarches() {
  console.log('📋 Seeding modèles de démarches...');
  for (const modele of MODELES_DEMARCHES) {
    await prisma.modeleDemarche.upsert({
      where: { titre: modele.titre },
      update: modele,
      create: modele,
    });
  }
  console.log(`✅ ${MODELES_DEMARCHES.length} modèles de démarches seeded`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Running main seeder...\n');
  await seedTags();
  await seedModelesDemarches();
  console.log('\n✨ Seeding complete!');
  console.log('ℹ️  For user-specific demo data run: npm run db:seed-demo [email]');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seeding failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
