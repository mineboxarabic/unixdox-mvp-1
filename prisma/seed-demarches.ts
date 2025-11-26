import { PrismaClient, DemarcheCategorie, DemarcheStatut } from '@prisma/client';

const prisma = new PrismaClient();

async function seedDemarches() {
  console.log('🌱 Seeding demarches data...');

  // Create sample ModeleDemarche if they don't exist
  const modeles = [
    {
      titre: 'Démarche AAH',
      description: 'Allocation Adulte Handicapé',
      typesDocumentsRequis: ['CARTE_IDENTITE', 'JUSTIFICATIF_DOMICILE', 'ATTESTATION_TRAVAIL'],
      categorie: DemarcheCategorie.ADMINISTRATIF,
      actif: true,
      ordre: 1,
    },
    {
      titre: 'Demande de visa suisse',
      description: 'Visa pour la Suisse',
      typesDocumentsRequis: ['PASSEPORT', 'JUSTIFICATIF_DOMICILE', 'RELEVE_BANCAIRE'],
      categorie: DemarcheCategorie.ADMINISTRATIF,
      actif: true,
      ordre: 2,
    },
    {
      titre: 'Location de locaux professionnels',
      description: 'Bail commercial',
      typesDocumentsRequis: ['CARTE_IDENTITE', 'JUSTIFICATIF_DOMICILE', 'RELEVE_BANCAIRE'],
      categorie: DemarcheCategorie.FINANCIER,
      actif: true,
      ordre: 3,
    },
    {
      titre: "Création d'autoentreprise",
      description: 'Statut auto-entrepreneur',
      typesDocumentsRequis: ['CARTE_IDENTITE', 'JUSTIFICATIF_DOMICILE'],
      categorie: DemarcheCategorie.JURIDIQUE,
      actif: true,
      ordre: 4,
    },
    {
      titre: 'Aide au logement CAF',
      description: 'APL ou autres aides au logement',
      typesDocumentsRequis: ['CARTE_IDENTITE', 'JUSTIFICATIF_DOMICILE', 'FICHE_PAIE'],
      categorie: DemarcheCategorie.FINANCIER,
      actif: true,
      ordre: 5,
    },
  ];

  for (const modele of modeles) {
    await prisma.modeleDemarche.upsert({
      where: { titre: modele.titre },
      update: modele,
      create: modele,
    });
  }

  console.log('✅ Created/updated ModeleDemarche entries');

  // Get first user for testing
  const firstUser = await prisma.user.findFirst();

  if (firstUser) {
    console.log(`📝 Creating sample demarches for user: ${firstUser.email}`);

    const allModeles = await prisma.modeleDemarche.findMany();

    // Create sample DemarcheUtilisateur instances
    for (let i = 0; i < Math.min(15, allModeles.length * 3); i++) {
      const modele = allModeles[i % allModeles.length];
      const statuses = [DemarcheStatut.EN_COURS, DemarcheStatut.COMPLETE, DemarcheStatut.ABANDONNEE];
      const status = statuses[i % statuses.length];

      await prisma.demarcheUtilisateur.create({
        data: {
          idUtilisateur: firstUser.id,
          idModele: modele.id,
          statut: status,
          complete: status === DemarcheStatut.COMPLETE,
          dateDebut: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000), // Random date in last 90 days
          dateCompletion: status === DemarcheStatut.COMPLETE 
            ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
            : null,
          notes: `Notes pour ${modele.titre}`,
        },
      });
    }

    console.log('✅ Created sample demarches for testing');
  }

  console.log('✨ Demarches seeding complete!');
}

async function main() {
  try {
    await seedDemarches();
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
