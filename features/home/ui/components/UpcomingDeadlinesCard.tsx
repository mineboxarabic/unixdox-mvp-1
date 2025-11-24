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

export interface UpcomingDeadlinesCardProps {
  deadlines: Deadline[];
  isPremiumUser: boolean;
  onViewAll?: () => void;
  onUpgrade?: () => void;
}

export function UpcomingDeadlinesCard({
  deadlines,
  isPremiumUser,
  onViewAll,
  onUpgrade,
}: UpcomingDeadlinesCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "short",
    }).format(date);
  };

  const getStatusBadgeProps = (status: Deadline["status"]) => {
    switch (status) {
      case "À venir":
        return { colorScheme: "primary" as const, label: "À venir" };
      case "Urgent":
        return { colorScheme: "danger" as const, label: "Urgent" };
    }
  };

  const renderPremiumUpgrade = () => (
    <EmptyState
      icon={<LuCrown />}
      title=""
      description="Les échéances à venir sont une fonctionnalité premium"
      action={
        <Button
          size="md"
          bg="primary.50"
          color="primary.600"
          _hover={{ bg: "primary.100" }}
          onClick={onUpgrade}
          rightIcon={<LuArrowUpRight />}
        >
          Passer à Unidox premium
        </Button>
      }
    />
  );

  const renderEmptyState = () => (
    <EmptyState
      icon={<LuClock color="var(--chakra-colors-neutral-400)" />}
      title="Aucune échéance"
      description="Vous n'avez pas d'échéances à venir pour le moment"
    />
  );

  const renderDeadlinesList = () => (
    <Flex direction="column" gap="0">
      {deadlines.map((deadline, index) => {
        const statusProps = getStatusBadgeProps(deadline.status);
        return (
          <Box key={deadline.id}>
            <Flex py="3" alignItems="center" gap="4">
              <Flex
                direction="column"
                alignItems="center"
                justifyContent="center"
                minW="50px"
                h="50px"
                bg="primary.50"
                borderRadius="md"
              >
                <Text fontSize="lg" fontWeight="bold" color="primary.600">
                  {formatDate(deadline.date).split(" ")[0]}
                </Text>
                <Text fontSize="xs" color="primary.600" textTransform="uppercase">
                  {formatDate(deadline.date).split(" ")[1]}
                </Text>
              </Flex>
              <Flex direction="column" gap="1" flex="1">
                <Text fontSize="sm" fontWeight="medium" color="text.fg">
                  {deadline.title}
                </Text>
              </Flex>
              <Badge
                colorScheme={statusProps.colorScheme}
                variant="subtle"
                size="sm"
              >
                {statusProps.label}
              </Badge>
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
          {isPremiumUser && (
            <Badge colorScheme="accent" variant="subtle" size="sm">
              <Flex alignItems="center" gap="1">
                <LuCrown size={12} />
                Premium
              </Flex>
            </Badge>
          )}
        </Flex>
      </CardHeader>
      <CardBody>
        {!isPremiumUser
          ? renderPremiumUpgrade()
          : deadlines.length === 0
          ? renderEmptyState()
          : renderDeadlinesList()}
      </CardBody>
      {isPremiumUser && deadlines.length > 0 && (
        <CardFooter>
          <Button variant="ghost" size="sm" onClick={onViewAll}>
            Voir tout
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
