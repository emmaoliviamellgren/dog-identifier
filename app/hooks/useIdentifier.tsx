'use client';

import { identifier } from '@/lib/identifier';
import { useState } from 'react';
import { Prediction } from '../types/globals';

export const useIdentifier = () => {
	const [image, setImage] = useState<string | null>(null);
	const [breedPredictions, setBreedPredictions] = useState<Prediction[] | null>(
		null
	);
	const [loading, setLoading] = useState<boolean>(false);

	const imageUpload = async (imageUrl: string) => {
        setImage(imageUrl);
        setLoading(true);
        const results = await identifier(imageUrl);
        setBreedPredictions(results || []);
        setLoading(false);
    };

    return { image, breedPredictions, loading, imageUpload };
};
