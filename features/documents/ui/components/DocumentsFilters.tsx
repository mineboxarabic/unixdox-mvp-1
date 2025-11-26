'use client';

import { Flex, Text } from '@chakra-ui/react';
import { SelectRoot, SelectTrigger, SelectContent, SelectItem, SelectValueText } from '@/shared/components/ui/select';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { DocumentType, DocumentStatut } from '@prisma/client';
import { createListCollection } from '@chakra-ui/react';
import { Button } from '@/shared/components/ui/button';
import { LuX } from 'react-icons/lu';

export function DocumentsFilters() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const documentTypes = createListCollection({
        items: [
            { label: 'Tous les types', value: '' },
            ...Object.values(DocumentType).map((type) => ({ label: type, value: type })),
        ],
    });

    const documentStatuts = createListCollection({
        items: [
            { label: 'Tous les statuts', value: '' },
            ...Object.values(DocumentStatut).map((statut) => ({ label: statut, value: statut })),
        ],
    });

    const handleTypeChange = (value: string[]) => {
        const params = new URLSearchParams(searchParams);
        if (value[0] && value[0] !== '') {
            params.set('type', value[0]);
        } else {
            params.delete('type');
        }
        router.replace(`${pathname}?${params.toString()}`);
    };

    const handleStatutChange = (value: string[]) => {
        const params = new URLSearchParams(searchParams);
        if (value[0] && value[0] !== '') {
            params.set('statut', value[0]);
        } else {
            params.delete('statut');
        }
        router.replace(`${pathname}?${params.toString()}`);
    };

    const handleClearFilters = () => {
        const params = new URLSearchParams(searchParams);
        params.delete('type');
        params.delete('statut');
        params.delete('search');
        router.replace(`${pathname}?${params.toString()}`);
    };

    const hasActiveFilters = searchParams.get('type') || searchParams.get('statut') || searchParams.get('search');

    return (
        <Flex gap={3} align="center" flexWrap="wrap" justify="center">
            <Flex gap={2} align="center">
                <Text fontSize="sm" fontWeight="medium" color="text.fg.muted">
                    Filtrer par:
                </Text>
            </Flex>

            <SelectRoot
                collection={documentTypes}
                value={[searchParams.get('type') || '']}
                onValueChange={(e) => handleTypeChange(e.value)}
                size="sm"
                width="200px"
            >
                <SelectTrigger>
                    <SelectValueText placeholder="Type de document" />
                </SelectTrigger>
                <SelectContent>
                    {documentTypes.items.map((type) => (
                        <SelectItem key={type.value} item={type}>
                            {type.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </SelectRoot>

            <SelectRoot
                collection={documentStatuts}
                value={[searchParams.get('statut') || '']}
                onValueChange={(e) => handleStatutChange(e.value)}
                size="sm"
                width="200px"
            >
                <SelectTrigger>
                    <SelectValueText placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                    {documentStatuts.items.map((statut) => (
                        <SelectItem key={statut.value} item={statut}>
                            {statut.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </SelectRoot>

            {hasActiveFilters && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearFilters}
                    color="text.fg.muted"
                >
                    <LuX size={14} />
                    Effacer les filtres
                </Button>
            )}
        </Flex>
    );
}
