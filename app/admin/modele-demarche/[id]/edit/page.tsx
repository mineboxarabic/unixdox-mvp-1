import { getModeleDemarcheById } from "@/features/admin/actions";
import { EditModeleDemarcheClient } from "@/features/admin/ui/EditModeleDemarcheClient";
import { Container, Text } from "@chakra-ui/react";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditModeleDemarchePage({ params }: PageProps) {
  const { id } = await params;
  const result = await getModeleDemarcheById(id);

  if (!result.success || !result.data) {
    notFound();
  }

  return (
    <Container maxW="container.md" py={10}>
      <EditModeleDemarcheClient modele={result.data} />
    </Container>
  );
}
