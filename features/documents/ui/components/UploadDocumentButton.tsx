'use client';

import { Button } from '@/shared/components/ui/button';
import { LuFilePlus } from 'react-icons/lu';
import { useRef, useState } from 'react';
import { uploadDocumentFile } from '../../actions';
import { ProcessingState } from '@/shared/components/documents/ProcessingState';

export function UploadDocumentButton() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setIsProcessing(true);
            try {
                const formData = new FormData();
                formData.append('file', e.target.files[0]);
                await uploadDocumentFile(formData);
            } finally {
                setIsProcessing(false);
                e.target.value = ''; // Reset
            }
        }
    };

    return (
        <>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <ProcessingState isOpen={isProcessing} onOpenChange={(e) => setIsProcessing(e.open)} />
            <Button
                size="md"
                bg="primary.50"
                color="primary.600"
                _hover={{ bg: 'primary.100' }}
                onClick={handleClick}
                leftIcon={<LuFilePlus size={18} />}
            >
                Ajouter un document
            </Button>
        </>
    );
}
