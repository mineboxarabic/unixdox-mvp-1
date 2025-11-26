import { LuFiles, LuFileText, LuImage, LuFile, LuCreditCard, LuBriefcase, LuDollarSign } from "react-icons/lu";
import { Box } from "@chakra-ui/react";
import { DocumentType } from "@prisma/client";

interface DocumentIconProps {
  type: DocumentType | string;
  size?: number;
  color?: string;
}

export function DocumentIcon({ type, size = 24, color }: DocumentIconProps) {
  const getIcon = () => {
    switch (type) {
      case "FACTURE":
      case "FICHE_PAIE":
      case "RELEVE_BANCAIRE":
        return <LuDollarSign size={size} color={color} />;
      case "CONTRAT":
      case "ATTESTATION_TRAVAIL":
        return <LuBriefcase size={size} color={color} />;
      case "CARTE_IDENTITE":
      case "PASSEPORT":
      case "PERMIS_CONDUIRE":
      case "CARTE_VITALE":
        return <LuCreditCard size={size} color={color} />;
      case "JUSTIFICATIF_DOMICILE":
      case "ACTE_NAISSANCE":
      case "ACTE_MARIAGE":
        return <LuFileText size={size} color={color} />;
      default:
        return <LuFile size={size} color={color} />;
    }
  };

  return <Box display="inline-flex">{getIcon()}</Box>;
}
