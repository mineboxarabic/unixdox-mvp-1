import { Badge } from "@/shared/components/ui";

interface ProcedureStatusBadgeProps {
  status: "en-cours" | "terminée" | "en-attente" | string;
}

export function ProcedureStatusBadge({ status }: ProcedureStatusBadgeProps) {
  switch (status) {
    case "en-cours":
      return <Badge colorScheme="primary" variant="subtle">En cours</Badge>;
    case "terminée":
      return <Badge colorScheme="success" variant="subtle">Terminée</Badge>;
    case "en-attente":
      return <Badge colorScheme="warning" variant="subtle">En attente</Badge>;
    default:
      return <Badge colorScheme="neutral" variant="subtle">{status}</Badge>;
  }
}
