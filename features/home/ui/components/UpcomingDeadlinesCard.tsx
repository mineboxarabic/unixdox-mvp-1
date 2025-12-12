"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge,
  EmptyState,
  Separator,
} from "@/shared/components/ui";
import { Button } from "@/shared/components/ui/button";
import { LuClock, LuCrown, LuArrowUpRight } from "react-icons/lu";
import type { Deadline } from "../../types";
import { formatDate } from "@/shared/utils/date";

import { useRouter } from "next/navigation";

export interface UpcomingDeadlinesCardProps {
  deadlines: Deadline[];
  isPremiumUser: boolean;
  onViewAll?: () => void;
  onUpgrade?: () => void;
  onRenew?: (documentId?: string) => void;
}

export function UpcomingDeadlinesCard({
  deadlines,
  isPremiumUser,
  onViewAll,
  onUpgrade,
  onRenew,
}: UpcomingDeadlinesCardProps) {
  const router = useRouter();

  const getTimeLeft = (date: Date) => {
    const now = new Date();
    const target = new Date(date);
    const diffTime = target.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return `Expiré`;
    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays < 30) return `${diffDays} jours`;
    const diffMonths = Math.round(diffDays / 30);
    return `${diffMonths} mois`;
  };

  const renderEmptyState = () => (
    <EmptyState
      icon={<LuClock color="var(--chakra-colors-neutral-400)" />}
      title=""
      description="Aucune échéance à venir"
    />
  );

  const renderDeadlinesList = () => (
    <Flex direction="column" gap="0">
      {deadlines.map((deadline, index) => {
        const timeLeft = getTimeLeft(deadline.date);
        const isUrgent = deadline.status === "Urgent";
        const isExpired = deadline.status === "Expiré";

        let badgeColorScheme: "warning" | "danger" | "primary" = "primary";
        if (isExpired) badgeColorScheme = "danger";
        else if (isUrgent) badgeColorScheme = "warning";

        return (
          <Box key={deadline.id}>
            <Flex py="4" alignItems="center" gap="4" justifyContent="space-between">
              <Flex alignItems="center" gap="4" flex="1">
                <Badge
                  colorScheme={badgeColorScheme}
                  variant="subtle"
                  size="sm"
                >
                  <span suppressHydrationWarning>{timeLeft}</span>
                </Badge>
                <Text fontSize="md" color="text.fg">
                  {deadline.title}
                </Text>
              </Flex>

              <Button
                variant="plain"
                colorPalette="blue"
                size="sm"
                textDecoration="underline"
                onClick={() => onRenew ? onRenew(deadline.documentId) : router.push(`/documents?id=${deadline.documentId}`)}
              >
                Renouveler
              </Button>
            </Flex>
            {index < deadlines.length - 1 && <Separator />}
          </Box>
        );
      })}
    </Flex>
  );

  // Render premium upgrade overlay for non-premium users
  const renderPremiumOverlay = () => (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="whiteAlpha.800"
      backdropFilter="blur(4px)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex={1}
      borderRadius="lg"
    >
      <Flex direction="column" align="center" gap={3} p={4}>
        <Box
          p={3}
          bg="yellow.100"
          borderRadius="full"
        >
          <LuCrown size={24} color="#D97706" />
        </Box>
        <Text fontSize="sm" fontWeight="medium" color="text.fg" textAlign="center">
          Fonctionnalité Premium
        </Text>
        <Button
          size="sm"
          bg="primary.600"
          color="white"
          borderRadius="full"
          _hover={{ bg: 'primary.500' }}
          onClick={onUpgrade}
        >
          <Flex align="center" gap={1}>
            <Text fontSize="xs">Passer à Premium</Text>
            <LuArrowUpRight size={14} />
          </Flex>
        </Button>
      </Flex>
    </Box>
  );

  return (
    <Card>
      <Box position="relative">
        {/* Premium overlay for non-premium users - inside card to preserve borders */}
        {!isPremiumUser && renderPremiumOverlay()}

        <CardHeader>
          <Flex gap="3" alignItems="center">
            <LuClock size={24} color="var(--chakra-colors-neutral-400)" />
            <Text fontSize="lg" fontWeight="semibold" color="text.fg">
              Échéances à venir
            </Text>
            {!isPremiumUser && (
              <Box
                p={0.5}
                bg="yellow.100"
                borderRadius="full"
                title="Premium"
              >
                <LuCrown size={14} color="#D97706" />
              </Box>
            )}
          </Flex>
        </CardHeader>
        <CardBody>
          {deadlines.length === 0
            ? renderEmptyState()
            : renderDeadlinesList()}
        </CardBody>
        {deadlines.length > 0 && isPremiumUser && (
          <CardFooter>
            <Button variant="ghost" size="sm" onClick={onViewAll}>
              Voir tout
            </Button>
          </CardFooter>
        )}
      </Box>
    </Card>
  );
}

