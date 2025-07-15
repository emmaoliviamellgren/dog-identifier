"use client";

import { Prediction, ResponseType } from "@/app/types/globals";
import { convertImageFormat } from "@/app/utils/convertImageFormat";
import { useState } from "react";

export const useIdentifier = () => {
	const [image, setImage] = useState<string | null>(null);
	const [breedPredictions, setBreedPredictions] = useState<
		Prediction[] | null
	>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const identifier = async (file: string) => {
		try {
			const base64Image = await convertImageFormat(file);

			const res = await fetch("/api/clarifaiModel", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ submittedImage: base64Image }),
			});

			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(errorData.error || "Unexpected error");
			}

			const data = await res.json();
			const breedPredictions: ResponseType[] =
				data.outputs[0].data.concepts;

			return breedPredictions.map((prediction) => ({
				breed: prediction.name,
				probability: prediction.value,
			}));
		} catch (error) {
			console.error("Error identifying breed:", error);
			throw error;
		}
	};

	const imageUpload = async (imageUrl: string) => {
		try {
			setImage(imageUrl);
			setLoading(true);
			setError(null);
			
			const results = await identifier(imageUrl);
			setBreedPredictions(results || []);
		} catch (error) {
			console.error("Error uploading image:", error);
			setBreedPredictions(null);
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError("Failed to process image");
			}
		} finally {
			setLoading(false);
		}
	};

	return { image, breedPredictions, loading, error, imageUpload };
};