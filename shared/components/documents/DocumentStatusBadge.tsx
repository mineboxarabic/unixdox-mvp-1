import { Badge } from "@/shared/components/ui";
import { DocumentStatut } from "@prisma/client";

interface DocumentStatusBadgeProps {
  status: DocumentStatut | string;
}

export function DocumentStatusBadge({ status }: DocumentStatusBadgeProps) {
  switch (status) {
    case "VERIFIE":
      return <Badge colorScheme="success" variant="subtle">Vérifié</Badge>;
    case "EN_ATTENTE":
      return <Badge colorScheme="warning" variant="subtle">En attente</Badge>;
    case "REFUSE":
      return <Badge colorScheme="danger" variant="subtle">Refusé</Badge>;
    case "EXPIRE":
      return <Badge colorScheme="neutral" variant="subtle">Expiré</Badge>;
    default:
      return <Badge colorScheme="neutral" variant="subtle">{status}</Badge>;
  }
}
