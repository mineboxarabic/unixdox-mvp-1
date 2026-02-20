import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Clears all application data EXCEPT users and authentication-related data.
 * This is useful for preparing the app for demos or resetting test data.
 * 
 * Preserved: User, Account, Session, VerificationToken
 * Deleted: Notification, DemarcheUtilisateur, Document, Dossier, ModeleDemarche, Tag
 */
async function clearData() {
  console.log('🧹 Starting data cleanup...');
  console.log('⚠️  This will delete all application data EXCEPT users.\n');

  try {
    // Delete in order respecting foreign key dependencies
    
    // 1. Notifications (depends on Document, User)
    const deletedNotifications = await prisma.notification.deleteMany({});
    console.log(`✅ Deleted ${deletedNotifications.count} notifications`);

    // 2. DemarcheUtilisateur (depends on ModeleDemarche, User)
    const deletedDemarchesUtilisateur = await prisma.demarcheUtilisateur.deleteMany({});
    console.log(`✅ Deleted ${deletedDemarchesUtilisateur.count} user démarches`);

    // 3. Documents (depends on User, related to Dossier via many-to-many)
    const deletedDocuments = await prisma.document.deleteMany({});
    console.log(`✅ Deleted ${deletedDocuments.count} documents`);

    // 4. Dossiers (depends on User)
    const deletedDossiers = await prisma.dossier.deleteMany({});
    console.log(`✅ Deleted ${deletedDossiers.count} dossiers`);

    // 5. ModeleDemarche (standalone, but referenced by DemarcheUtilisateur)
    const deletedModeles = await prisma.modeleDemarche.deleteMany({});
    console.log(`✅ Deleted ${deletedModeles.count} modèles de démarche`);

    // 6. Tags (standalone)
    const deletedTags = await prisma.tag.deleteMany({});
    console.log(`✅ Deleted ${deletedTags.count} tags`);

    console.log('\n✨ Data cleanup complete!');
    console.log('ℹ️  Users and authentication data have been preserved.');
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    throw error;
  }
}

async function main() {
  await clearData();
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
