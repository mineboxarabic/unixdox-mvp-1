'use client';

import { Box } from '@chakra-ui/react';
import { Input } from '@/shared/components/ui/input';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { LuSearch } from 'react-icons/lu';

export function DocumentSearch() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('search', term);
        } else {
            params.delete('search');
        }
        router.replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <Box position="relative" width="full" maxW="750px">
            <Box
                position="absolute"
                left="3"
                top="50%"
                transform="translateY(-50%)"
                color="text.fg.subtle"
                zIndex="1"
            >
                <LuSearch size={18} />
            </Box>
            <Input
                placeholder="Recherchez un document..."
                defaultValue={searchParams.get('search')?.toString()}
                onChange={(e) => handleSearch(e.target.value)}
                style={{ paddingLeft: "2.5rem", backgroundColor: "var(--chakra-colors-bg-surface)" }}
                size="lg"
                width="full"
                borderRadius="full"
            />
        </Box>
    );
}
