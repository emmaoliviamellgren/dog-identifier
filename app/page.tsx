"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { slideUpOnEnter } from "./utils/animations";
import { useIdentifier } from "./hooks/useIdentifier";
import { useState } from "react";
import ImageUploader from "./components/ImageUploader";
import Predictions from "./components/Predictions";

export default function Home() {
	const [fileName, setFileName] = useState<string | null>(null);

	const { loading, image, error, imageUpload, breedPredictions } =
		useIdentifier();

	return (
		<main className="min-h-screen flex flex-col pt-36 md:pt-12 md:justify-center items-center selection:bg-slate-300/30">
			<section className="flex flex-col gap-8 items-center">
				<h2 className="text-3xl font-medium bg-clip-text bg-gradient-to-b from-gray-400 to-gray-800 text-transparent tracking-tight">
					Identify the Breed
				</h2>

				<ImageUploader
					onImageUpload={imageUpload}
					setFileName={setFileName}
				/>

				{/* ------ Displaying uploaded image ------ */}
				<main className="flex flex-col gap-2 pb-6">
					{image && (
						<motion.div
							{...slideUpOnEnter}
							className="flex flex-wrap justify-start gap-4 p-3 h-auto w-[85vw] min-w-[300px] md:w-[450px] items-center rounded-md border text-sm">
							<Image
								src={image}
								width={240}
								height={240}
								alt="Dog"
								className="w-12 h-12 object-cover rounded-lg"
							/>
							<p>{fileName}</p>
						</motion.div>
					)}
					{error && <p className="text-gray-600">{error}</p>}
				</main>

				<Predictions
					predictions={breedPredictions}
					loading={loading}
				/>
			</section>
		</main>
	);
}
