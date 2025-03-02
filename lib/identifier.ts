import { Prediction, ResponseType } from '@/app/types/globals';
import { convertImageFormat } from '@/app/utils/convertImageFormat';

export const identifier = async (file: string) => {
	try {
		const base64Image = await convertImageFormat(file);

		const res = await fetch('/api/clarifaiModel', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ submittedImage: base64Image }),
		});

		if (!res.ok) {
			throw new Error('Failed to fetch Clarifai API');
		}

		const data = await res.json();
		const breedPredictions: ResponseType[] = await data.outputs[0].data
			.concepts;

		return breedPredictions.map(
			(prediction) =>
				({
					breed: prediction.name,
					probability: prediction.value,
				} as Prediction)
		);
	} catch (error) {
		console.error('Error identifying breed:', error);
		return [];
	}
};
