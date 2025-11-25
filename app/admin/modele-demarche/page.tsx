import { getModeleDemarches } from "@/features/admin/actions";
import { Button } from "@/shared/components/ui/button";
import { Card, CardBody } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { 
  Box, 
  VStack, 
  Heading, 
  Text, 
  Container,
  Flex,
  Table,
  HStack
} from "@chakra-ui/react";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import { ModeleActions } from "@/features/admin/ui/ModeleActions";

export default async function ModeleDemarcheListPage() {
  const result = await getModeleDemarches();
  const modeles = result.success ? result.data : [];

  return (
    <Container maxW="container.xl" py={10}>
      <Flex justify="space-between" align="center" mb={8}>
        <VStack align="start" gap={1}>
          <Heading size="lg">Procedure Models</Heading>
          <Text color="fg.muted">
            Manage the templates for administrative procedures.
          </Text>
        </VStack>
        <Link href="/admin/modele-demarche/create">
          <Button>
            <FiPlus /> Create New Model
          </Button>
        </Link>
      </Flex>

      <Card>
        <CardBody>
          {modeles && modeles.length > 0 ? (
            <Table.Root variant="outline">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Title</Table.ColumnHeader>
                  <Table.ColumnHeader>Category</Table.ColumnHeader>
                  <Table.ColumnHeader>Documents Required</Table.ColumnHeader>
                  <Table.ColumnHeader>Status</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {modeles.map((modele) => (
                  <Table.Row key={modele.id}>
                    <Table.Cell fontWeight="medium">{modele.titre}</Table.Cell>
                    <Table.Cell>
                      <Badge variant="subtle" colorScheme="primary">
                        {modele.categorie}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <Text fontSize="sm" color="fg.muted">
                        {modele.typesDocumentsRequis.length} documents
                      </Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge 
                        colorScheme={modele.actif ? "success" : "neutral"} 
                        variant="solid"
                      >
                        {modele.actif ? "Active" : "Inactive"}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell textAlign="end">
                      <HStack justify="end" gap={2}>
                        <ModeleActions modeleId={modele.id} />
                      </HStack>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          ) : (
            <Box p={10} textAlign="center">
              <Text color="fg.muted">No models found. Create one to get started.</Text>
            </Box>
          )}
        </CardBody>
      </Card>
    </Container>
  );
}
