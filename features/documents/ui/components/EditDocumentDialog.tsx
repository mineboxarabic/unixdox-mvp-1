import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  Button,
  Input,
  FormInput,
  SelectRoot,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValueText,
  SelectLabel,
  Badge,
} from "@/shared/components/ui";
import { Box, VStack, HStack, Text, createListCollection, Flex } from "@chakra-ui/react";
import { DocumentType, Document } from "@prisma/client";
import { useState, useEffect, useRef } from "react";
import { toaster } from "@/shared/components/ui/toaster";
import { updateDocumentDetails, getTags } from "../../actions";
import { IoClose } from "react-icons/io5";

interface EditableDocument {
  id: string;
  nomFichier?: string;
  name?: string;
  type: string | DocumentType;
  tags?: string[];
  dateExpiration?: Date | string | null;
  expirationDate?: Date | string | null;
}

interface EditDocumentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  document: EditableDocument;
}

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  availableTags: string[];
}

function TagInput({ value, onChange, availableTags }: TagInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredTags = availableTags.filter(
    (tag) =>
      tag.toLowerCase().includes(inputValue.toLowerCase()) &&
      !value.includes(tag)
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputValue.trim()) {
        addTag(inputValue.trim());
      }
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  };

  const addTag = (tag: string) => {
    if (!value.includes(tag)) {
      onChange([...value, tag]);
    }
    setInputValue("");
    setShowSuggestions(false);
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Box ref={containerRef} position="relative">
      <Box
        border="1px solid"
        borderColor="border.default"
        borderRadius="md"
        p={2}
        bg="bg.surface"
        _focusWithin={{
          borderColor: "primary.500",
          boxShadow: "0 0 0 1px var(--chakra-colors-primary-500)",
        }}
      >
        <Flex wrap="wrap" gap={2} align="center">
          {value.map((tag) => (
            <Badge key={tag} variant="subtle" colorScheme="primary">
              {tag}
              <Box
                as="span"
                ml={1}
                cursor="pointer"
                onClick={() => removeTag(tag)}
                display="inline-flex"
                alignItems="center"
              >
                <IoClose size={12} />
              </Box>
            </Badge>
          ))}
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setShowSuggestions(true);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            placeholder={value.length === 0 ? "Ajouter des tags..." : ""}
            border="none"
            _focus={{ boxShadow: "none" }}
            p={0}
            h="auto"
            minW="100px"
            flex={1}
          />
        </Flex>
      </Box>

      {showSuggestions && inputValue && (
        <Box
          position="absolute"
          top="100%"
          left={0}
          right={0}
          zIndex={1000}
          bg="bg.surface"
          border="1px solid"
          borderColor="border.default"
          borderRadius="md"
          mt={1}
          boxShadow="lg"
          maxH="200px"
          overflowY="auto"
        >
          {filteredTags.map((tag) => (
            <Box
              key={tag}
              p={2}
              cursor="pointer"
              _hover={{ bg: "bg.muted" }}
              onClick={() => addTag(tag)}
            >
              <Text fontSize="sm">{tag}</Text>
            </Box>
          ))}
          {!filteredTags.includes(inputValue) && inputValue.trim() && (
            <Box
              p={2}
              cursor="pointer"
              _hover={{ bg: "bg.muted" }}
              onClick={() => addTag(inputValue.trim())}
              borderTop={filteredTags.length > 0 ? "1px solid" : "none"}
              borderColor="border.default"
            >
              <Text fontSize="sm" color="primary.600">
                Créer "{inputValue.trim()}"
              </Text>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export function EditDocumentDialog({ isOpen, onClose, document }: EditDocumentDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    nomFichier: "",
    type: "" as DocumentType,
    tags: [] as string[],
    dateExpiration: "",
  });

  useEffect(() => {
    getTags().then(setAvailableTags);
  }, []);

  useEffect(() => {
    if (document) {
      setFormData({
        nomFichier: document.nomFichier || document.name || "",
        type: document.type as DocumentType,
        tags: document.tags || [],
        dateExpiration: (document.dateExpiration || document.expirationDate)
            ? new Date((document.dateExpiration || document.expirationDate)!).toISOString().split('T')[0] 
            : "",
      });
    }
  }, [document]);

  const handleSubmit = async () => {
    if (!document) return;
    setIsLoading(true);

    try {
      const result = await updateDocumentDetails(document.id, {
        nomFichier: formData.nomFichier,
        type: formData.type,
        tags: formData.tags,
        dateExpiration: formData.dateExpiration ? new Date(formData.dateExpiration) : null,
      });

      if (result.success) {
        toaster.create({ title: "Document mis à jour avec succès", type: "success" });
        onClose();
      } else {
        console.error("Update failed:", result);
        toaster.create({ title: "Erreur lors de la mise à jour", description: result.error, type: "error" });
      }
    } catch (error) {
      toaster.create({ title: "Une erreur est survenue", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const documentTypes = createListCollection({
    items: Object.values(DocumentType).map((type) => ({ label: type, value: type })),
  });

  return (
    <DialogRoot open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier le document</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <VStack gap={4} align="stretch">
            <FormInput
              label="Nom du fichier"
              value={formData.nomFichier}
              onChange={(e) => setFormData({ ...formData, nomFichier: e.target.value })}
            />

            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={1.5}>Type de document</Text>
              <SelectRoot 
                collection={documentTypes}
                value={[formData.type]} 
                onValueChange={(e) => setFormData({ ...formData, type: e.value[0] as DocumentType })}
              >
                <SelectTrigger>
                  <SelectValueText placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.items.map((type) => (
                    <SelectItem key={type.value} item={type}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={1.5}>Tags</Text>
              <TagInput
                value={formData.tags}
                onChange={(tags) => setFormData({ ...formData, tags })}
                availableTags={availableTags}
              />
            </Box>

            <FormInput
              label="Date d'expiration"
              type="date"
              value={formData.dateExpiration}
              onChange={(e) => setFormData({ ...formData, dateExpiration: e.target.value })}
            />
          </VStack>
        </DialogBody>
        <DialogFooter>
          <Button  variant="ghost" onClick={onClose} disabled={isLoading}>
            Annuler
          </Button>
          <Button onClick={handleSubmit} loading={isLoading}>
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
