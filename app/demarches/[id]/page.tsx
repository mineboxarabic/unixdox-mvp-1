import { auth } from '@/shared/auth';
import { redirect, notFound } from 'next/navigation';
import { prisma } from '@/shared/config/prisma';
import { DemarcheViewPage } from '@/features/demarches/ui/pages/DemarcheViewPage';

interface DemarcheViewRouteProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: DemarcheViewRouteProps) {
  const { id } = await params;
  
  const demarche = await prisma.demarcheUtilisateur.findUnique({
    where: { id },
    include: { modele: true },
  });

  if (!demarche) {
    return { title: 'Démarche introuvable | Unidox' };
  }

  return {
    title: `${demarche.modele.titre} | Unidox`,
    description: demarche.modele.description || 'Détails de la démarche',
  };
}

export default async function DemarcheViewRoute({ params }: DemarcheViewRouteProps) {
  const session = await auth();
  const { id } = await params;

  if (!session?.user?.id) {
    redirect('/login');
  }

  // Fetch demarche with related data
  const demarche = await prisma.demarcheUtilisateur.findFirst({
    where: {
      id,
      idUtilisateur: session.user.id,
    },
    include: {
      modele: true,
      utilisateur: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  if (!demarche) {
    notFound();
  }

  // Fetch user documents for matching
  const userDocuments = await prisma.document.findMany({
    where: { idProprietaire: session.user.id },
    orderBy: { dateUpload: 'desc' },
  });

  // Transform the data for the client component
  const demarcheData = {
    id: demarche.id,
    dateDebut: demarche.dateDebut,
    dateCompletion: demarche.dateCompletion,
    statut: demarche.statut,
    notes: demarche.notes,
    complete: demarche.complete,
    documentsAssocies: demarche.documentsAssocies as Record<string, string> | null,
    modele: {
      id: demarche.modele.id,
      titre: demarche.modele.titre,
      description: demarche.modele.description,
      typesDocumentsRequis: demarche.modele.typesDocumentsRequis,
      categorie: demarche.modele.categorie,
    },
    utilisateur: {
      id: demarche.utilisateur.id,
      name: demarche.utilisateur.name,
      email: demarche.utilisateur.email,
    },
  };

  return (
    <DemarcheViewPage
      demarche={demarcheData}
      userDocuments={userDocuments}
    />
  );
}
