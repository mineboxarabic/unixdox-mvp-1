"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import {
  Badge,
  EmptyState,
  Separator,
} from "@/shared/components/ui";
import { Button } from "@/shared/components/ui/button";
import { LuClock, LuCrown, LuArrowUpRight } from "react-icons/lu";
import type { Deadline } from "../../types";
import { useRouter } from "next/navigation";

export interface UpcomingDeadlinesCardProps {
  deadlines: Deadline[];
  isPremiumUser: boolean;
  onViewAll?: () => void;
  onUpgrade?: () => void;
  onRenew?: (documentId?: string) => void;
}

/**
 * Échéances à venir card — shows upcoming document deadlines
 * Matches Figma v3.0: white bg, neutral.200 border, rounded 2xl, h=277px
 * Orange time-left badges, blue underlined action links
 */
export function UpcomingDeadlinesCard({
  deadlines,
  isPremiumUser,
  onViewAll,
  onUpgrade,
  onRenew,
}: UpcomingDeadlinesCardProps) {
  const router = useRouter();

  /** Compute human-readable time remaining from a date */
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

  /** Premium upgrade overlay for non-premium users */
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
      borderRadius="2xl"
    >
      <Flex direction="column" align="center" gap={3} p={4}>
        <Box p={3} bg="yellow.100" borderRadius="full">
          <LuCrown size={24} color="#D97706" />
        </Box>
        <Text fontSize="sm" fontWeight="medium" color="gray.800" textAlign="center">
          Fonctionnalité Premium
        </Text>
        <Button
          size="sm"
          bg="primary.600"
          color="white"
          borderRadius="full"
          _hover={{ bg: "primary.500" }}
          onClick={onUpgrade}
        >
          <Text fontSize="xs">Passer à Premium</Text>
          <LuArrowUpRight size={14} />
        </Button>
      </Flex>
    </Box>
  );

  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="neutral.200"
      borderRadius="2xl"
      p="4"
      h="277px"
      overflow="hidden"
      display="flex"
      flexDirection="column"
      position="relative"
    >
      {/* Premium overlay for non-premium users */}
      {!isPremiumUser && renderPremiumOverlay()}

      {/* Card header */}
      <Flex gap="2" alignItems="center" pb="3">
        <LuClock size={20} color="var(--chakra-colors-gray-500)" />
        <Text fontSize="lg" fontWeight="semibold" color="gray.800">
          Échéances à venir
        </Text>
        {!isPremiumUser && (
          <Box p={0.5} bg="yellow.100" borderRadius="full" title="Premium">
            <LuCrown size={14} color="#D97706" />
          </Box>
        )}
      </Flex>

      {/* Card body */}
      <Box flex="1" overflow="auto">
        {deadlines.length === 0 ? (
          <EmptyState
            icon={<LuClock size={48} />}
            description="Aucune échéance à venir"
          />
        ) : (
          <Flex direction="column" gap="0">
            {deadlines.map((deadline, index) => {
              const timeLeft = getTimeLeft(deadline.date);
              const isExpired = deadline.status === "Expiré";

              return (
                <Box key={deadline.id}>
                  <Flex py="2.5" alignItems="center" gap="3" justifyContent="space-between">
                    <Flex alignItems="center" gap="3" flex="1" minW={0}>
                      {/* Orange time badge — matches Figma orange.subtle style */}
                      <Badge
                        colorScheme={isExpired ? "danger" : "warning"}
                        variant="subtle"
                        size="sm"
                        flexShrink={0}
                      >
                        <span suppressHydrationWarning>{timeLeft}</span>
                      </Badge>
                      <Text fontSize="sm" color="gray.700" truncate>
                        {deadline.title}
                      </Text>
                    </Flex>

                    {/* Blue underlined action link */}
                    <Button
                      variant="plain"
                      colorPalette="blue"
                      size="xs"
                      textDecoration="underline"
                      flexShrink={0}
                      onClick={() =>
                        onRenew
                          ? onRenew(deadline.documentId)
                          : router.push(`/documents?id=${deadline.documentId}`)
                      }
                    >
                      Renouveler
                    </Button>
                  </Flex>
                  {index < deadlines.length - 1 && <Separator />}
                </Box>
              );
            })}
          </Flex>
        )}
      </Box>

      {/* Footer — view all link */}
      {deadlines.length > 0 && isPremiumUser && (
        <Flex pt="2" justifyContent="flex-end">
          <Button variant="ghost" size="xs" onClick={onViewAll}>
            Voir tout
          </Button>
        </Flex>
      )}
    </Box>
  );
}

