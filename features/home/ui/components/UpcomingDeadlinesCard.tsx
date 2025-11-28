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

  return (
    <Card>
      <CardHeader>
        <Flex gap="3" alignItems="center">
          <LuClock size={24} color="var(--chakra-colors-neutral-400)" />
          <Text fontSize="lg" fontWeight="semibold" color="text.fg">
            Échéances à venir
          </Text>
        </Flex>
      </CardHeader>
      <CardBody>
        {deadlines.length === 0
            ? renderEmptyState()
            : renderDeadlinesList()}
      </CardBody>
      {deadlines.length > 0 && (
        <CardFooter>
          <Button variant="ghost" size="sm" onClick={onViewAll}>
            Voir tout
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
