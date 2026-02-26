'use client';

import {
  Box,
  Flex,
  Heading,
  Text,
  Accordion,
  Grid,
  VStack,
} from '@chakra-ui/react';
import {
  LuFileText,
  LuFolderOpen,
  LuClock,
  LuSettings,
  LuShield,
  LuUpload,
  LuSearch,
  LuBell,
} from 'react-icons/lu';

interface HelpSection {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  faqs: { question: string; answer: string }[];
}

const helpSections: HelpSection[] = [
  {
    id: 'documents',
    icon: <LuFileText size={24} />,
    title: 'Documents',
    description: 'Gérez vos documents et accédez-y facilement.',
    faqs: [
      {
        question: 'Comment uploader un document ?',
        answer:
          'Cliquez sur le bouton "Ajouter un document" depuis la page d\'accueil ou utilisez la fonction de glisser-déposer dans la section "Mes documents". Vous pouvez uploader des fichiers PDF, images et documents texte.',
      },
      {
        question: 'Quels types de fichiers sont acceptés ?',
        answer:
          'Unidox accepte les PDF, images (JPG, PNG), et documents texte (DOC, DOCX, TXT). La taille maximale par fichier est de 10 Mo.',
      },
      {
        question: 'Comment retrouver un document rapidement ?',
        answer:
          'Utilisez la barre de recherche globale en haut de la page d\'accueil. Vous pouvez aussi filtrer vos documents par type et statut dans la section "Mes documents".',
      },
    ],
  },
  {
    id: 'demarches',
    icon: <LuFolderOpen size={24} />,
    title: 'Démarches',
    description: 'Suivez vos procédures administratives en cours.',
    faqs: [
      {
        question: 'Comment créer une nouvelle démarche ?',
        answer:
          'Cliquez sur "Commencer une démarche" depuis la page d\'accueil. Choisissez un modèle existant ou créez une démarche personnalisée. Remplissez les informations requises et suivez l\'avancement.',
      },
      {
        question: 'Comment suivre l\'avancement d\'une démarche ?',
        answer:
          'Rendez-vous dans la section "Démarches". Chaque démarche affiche son statut (En cours, En attente, Terminée, Annulée) et la progression des étapes.',
      },
      {
        question: 'Puis-je modifier une démarche en cours ?',
        answer:
          'Oui, ouvrez la démarche concernée et cliquez sur "Modifier". Vous pouvez changer les informations, ajouter des documents ou mettre à jour le statut.',
      },
    ],
  },
  {
    id: 'echeances',
    icon: <LuClock size={24} />,
    title: 'Échéances',
    description: 'Ne manquez plus aucune deadline importante.',
    faqs: [
      {
        question: 'Qu\'est-ce que la fonction Échéances ?',
        answer:
          'La fonction Échéances est une fonctionnalité Premium qui vous permet de suivre toutes vos deadlines administratives. Elle affiche les dates importantes de vos documents et démarches.',
      },
      {
        question: 'Comment activer les échéances ?',
        answer:
          'Passez à l\'offre Premium pour débloquer cette fonctionnalité. Rendez-vous dans les paramètres ou cliquez sur "Passer Premium" dans la sidebar.',
      },
      {
        question: 'Comment recevoir des notifications pour les échéances ?',
        answer:
          'Activez les notifications dans les Paramètres. Vous recevrez des alertes pour les documents expirant bientôt et les deadlines importantes.',
      },
    ],
  },
  {
    id: 'search',
    icon: <LuSearch size={24} />,
    title: 'Recherche',
    description: 'Trouvez rapidement ce que vous cherchez.',
    faqs: [
      {
        question: 'Comment fonctionne la recherche globale ?',
        answer:
          'La barre de recherche sur la page d\'accueil permet de chercher dans vos documents et démarches simultanément. Commencez à taper et les résultats apparaissent instantanément.',
      },
      {
        question: 'Puis-je filtrer les résultats de recherche ?',
        answer:
          'Dans la section "Mes documents", utilisez les filtres par type de document et statut pour affiner vos recherches.',
      },
    ],
  },
  {
    id: 'settings',
    icon: <LuSettings size={24} />,
    title: 'Paramètres',
    description: 'Personnalisez votre expérience Unidox.',
    faqs: [
      {
        question: 'Comment modifier mes préférences ?',
        answer:
          'Rendez-vous dans Paramètres via la sidebar. Vous pouvez activer/désactiver les notifications et changer la langue de l\'interface (Français ou English).',
      },
      {
        question: 'Comment gérer mon stockage ?',
        answer:
          'Votre espace de stockage utilisé est affiché dans la sidebar. Pour augmenter votre capacité, passez à l\'offre Premium.',
      },
    ],
  },
  {
    id: 'premium',
    icon: <LuShield size={24} />,
    title: 'Premium & Admin',
    description: 'Fonctionnalités avancées pour utilisateurs Premium et administrateurs.',
    faqs: [
      {
        question: 'Qu\'est-ce que l\'offre Premium ?',
        answer:
          'L\'offre Premium débloque les fonctionnalités avancées : suivi des échéances, stockage illimité, et accès à toutes les fonctionnalités de l\'application.',
      },
      {
        question: 'Qui peut accéder au panneau d\'administration ?',
        answer:
          'Seuls les utilisateurs avec le rôle ADMIN ou MANAGER peuvent accéder au panneau d\'administration pour gérer les modèles de démarches.',
      },
      {
        question: 'Comment créer un modèle de démarche ?',
        answer:
          'Les administrateurs peuvent créer des modèles de démarches depuis le panneau Admin. Ces modèles seront disponibles pour tous les utilisateurs lors de la création d\'une nouvelle démarche.',
      },
    ],
  },
];

interface HelpCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  faqs: { question: string; answer: string }[];
}

function HelpCard({ icon, title, description, faqs }: HelpCardProps) {
  return (
    <Box
      bg="bg.surface"
      borderWidth="1px"
      borderColor="border.default"
      borderRadius="xl"
      overflow="hidden"
      transition="all 0.2s"
      _hover={{ boxShadow: 'md' }}
    >
      <Box p="6" borderBottomWidth="1px" borderColor="border.default">
        <Flex align="center" gap="3" mb="2">
          <Box color="primary.600">{icon}</Box>
          <Heading size="md" color="text.fg">
            {title}
          </Heading>
        </Flex>
        <Text color="text.fg.muted" fontSize="sm">
          {description}
        </Text>
      </Box>

      <Accordion.Root collapsible>
        {faqs.map((faq, index) => (
          <Accordion.Item key={index} value={`${title}-${index}`}>
            <Accordion.ItemTrigger
              px="6"
              py="4"
              _hover={{ bg: 'bg.muted' }}
              cursor="pointer"
            >
              <Text fontWeight="medium" color="text.fg" fontSize="sm">
                {faq.question}
              </Text>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent px="6" pb="4">
              <Text color="text.fg.muted" fontSize="sm" lineHeight="relaxed">
                {faq.answer}
              </Text>
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </Box>
  );
}

export function HelpPage() {
  return (
    <Box bg="bg.canvas" minH="100vh" py="10" px={{ base: '4', md: '12' }}>
      <Flex direction="column" gap="10" maxW="7xl" mx="auto">
        {/* Header */}
        <VStack gap="2" textAlign="center" mb="4">
          <Heading size="2xl" color="text.fg">
            Centre d&apos;Aide
          </Heading>
          <Text color="text.fg.muted" maxW="2xl">
            Trouvez rapidement des réponses à vos questions sur Unidox. Parcourez
            les sections ci-dessous ou utilisez la barre de recherche pour trouver
            ce dont vous avez besoin.
          </Text>
        </VStack>

        {/* Quick Links */}
        <Flex
          justify="center"
          gap="4"
          flexWrap="wrap"
          bg="primary.50"
          p="6"
          borderRadius="xl"
        >
          <Flex align="center" gap="2">
            <LuUpload color="var(--chakra-colors-primary-600)" />
            <Text fontSize="sm" color="primary.700">
              Upload de documents
            </Text>
          </Flex>
          <Flex align="center" gap="2">
            <LuFolderOpen color="var(--chakra-colors-primary-600)" />
            <Text fontSize="sm" color="primary.700">
              Gestion des démarches
            </Text>
          </Flex>
          <Flex align="center" gap="2">
            <LuClock color="var(--chakra-colors-primary-600)" />
            <Text fontSize="sm" color="primary.700">
              Suivi des échéances
            </Text>
          </Flex>
          <Flex align="center" gap="2">
            <LuBell color="var(--chakra-colors-primary-600)" />
            <Text fontSize="sm" color="primary.700">
              Notifications
            </Text>
          </Flex>
        </Flex>

        {/* Help Sections Grid */}
        <Grid
          templateColumns={{
            base: '1fr',
            md: 'repeat(2, 1fr)',
            xl: 'repeat(3, 1fr)',
          }}
          gap="6"
        >
          {helpSections.map((section) => (
            <HelpCard
              key={section.id}
              icon={section.icon}
              title={section.title}
              description={section.description}
              faqs={section.faqs}
            />
          ))}
        </Grid>

        {/* Contact Section */}
        <Box
          bg="bg.surface"
          borderWidth="1px"
          borderColor="border.default"
          borderRadius="xl"
          p="8"
          textAlign="center"
        >
          <Heading size="md" color="text.fg" mb="2">
            Besoin d&apos;aide supplémentaire ?
          </Heading>
          <Text color="text.fg.muted" mb="4">
            Notre équipe est là pour vous aider. N&apos;hésitez pas à nous contacter
            si vous ne trouvez pas la réponse à votre question.
          </Text>
          <Flex justify="center" gap="4">
            <Text fontSize="sm" color="text.fg.subtle">
              Email: support@unidox.app
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
