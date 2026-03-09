import { auth } from "@/auth";
import { getUsers, updateUserRole, updateUserPlan, updateUserOnboarding } from "@/features/admin/actions";
import { Card, CardBody } from "@/shared/components/ui/card";
import {
  Box,
  VStack,
  Heading,
  Text,
  Container,
  Flex,
} from "@chakra-ui/react";
import { UserManagementTable } from "@/features/admin/ui/UserManagementTable";

export default async function AdminUtilisateursPage() {
  const session = await auth();
  const result = await getUsers();
  const users = result.success ? result.data ?? [] : [];

  return (
    <Container maxW="container.xl" py={10}>
      <Flex justify="space-between" align="center" mb={8}>
        <VStack align="start" gap={1}>
          <Heading size="lg">Gestion des utilisateurs</Heading>
          <Text color="fg.muted">
            Gérez les rôles, abonnements et inscriptions des utilisateurs.
          </Text>
        </VStack>
      </Flex>

      <Card>
        <CardBody>
          {users.length > 0 ? (
            <UserManagementTable
              users={users}
              currentUserId={session?.user?.id ?? ""}
              updateUserRole={updateUserRole}
              updateUserPlan={updateUserPlan}
              updateUserOnboarding={updateUserOnboarding}
            />
          ) : (
            <Box textAlign="center" py={10}>
              <Text color="fg.muted">Aucun utilisateur trouvé.</Text>
            </Box>
          )}
        </CardBody>
      </Card>
    </Container>
  );
}
