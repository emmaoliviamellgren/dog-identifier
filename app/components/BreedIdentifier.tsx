'use client';

import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs';
import Image from 'next/image';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'motion/react';
import { slideUpOnEnter, bounceInOnEnter } from '../utils/animations';
import Loader from './Loader';

const BreedIdentifier = () => {
	const [image, setImage] = useState<string | null>(null);
	const [fileName, setFileName] = useState<string | null>(null);
	const [prediction, setPrediction] = useState<string | null>(null);

	const [loading, setLoading] = useState<boolean>(false);

	const onDrop = async (files: File[]) => {
		setImage(null);
		const file = files[0];

		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setImage(imageUrl);
			setFileName(file.name);
			await identifyBreed(imageUrl);
		}
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: { 'image/*': [] },
		onDrop,
	});

	const identifyBreed = async (imageUrl: string) => {
		setLoading(true);

		const img = new window.Image();
		img.src = imageUrl;

		img.onload = async () => {
			const model = await mobilenet.load();
			const predictions = await model.classify(img);

			const breed = predictions[0]?.className.split(',')[0];
			setPrediction(breed || 'Unknown breed');

			setLoading(false);
		};
	};

	return (
		<>
			<main className='flex flex-col gap-2 pb-6'>
				<div
					{...getRootProps()}
					className='flex flex-col justify-center gap-4 h-[150px] w-[85vw] min-w-[300px] md:w-[450px] items-center rounded-md border-2 border-dashed text-sm cursor-pointer 
        transition-all duration-300 hover:bg-gray-200/30'>
					<input {...getInputProps()} />
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='size-7'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75'
						/>
					</svg>
					{isDragActive ? (
						<p className='text-gray-600 flex items-center gap-1'>
							Drop image here
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='size-4'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z'
								/>
							</svg>
						</p>
					) : (
						<p className='text-gray-600 flex items-center flex-wrap justify-center text-center'>
							<span className='font-semibold mr-1'>
								Drag & drop
							</span>{' '}
							an image here, or
							<span className='inline-flex items-center justify-center whitespace-nowrap gap-0.5 mx-1 bg-gray-200 px-1 py-0.5 rounded-md focus-visible:outline-none focus-visible:ring-1 shadow-sm'>
								click
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth={1.5}
									stroke='currentColor'
									className='size-5'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5'
									/>
								</svg>
							</span>
							to select
						</p>
					)}
				</div>

				{image && (
					<motion.div
						{...slideUpOnEnter}
						className='flex flex-wrap justify-start gap-4 p-3 h-auto w-[85vw] min-w-[300px] md:w-[450px] items-center rounded-md border text-sm'>
						<Image
							src={image}
							width={240}
							height={240}
							alt='Dog'
							className='w-12 h-12 object-cover rounded-lg'
						/>
						<p>{fileName}</p>
					</motion.div>
				)}
			</main>

			{loading ? (
				<motion.div
					{...bounceInOnEnter}
					className='flex items-center gap-4'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='32'
						height='32'
						fill='#000000'
						viewBox='0 0 256 256'>
						<path d='M200,48H136V16a8,8,0,0,0-16,0V48H56A32,32,0,0,0,24,80V192a32,32,0,0,0,32,32H200a32,32,0,0,0,32-32V80A32,32,0,0,0,200,48Zm16,144a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V80A16,16,0,0,1,56,64H200a16,16,0,0,1,16,16Zm-52-56H92a28,28,0,0,0,0,56h72a28,28,0,0,0,0-56Zm-24,16v24H116V152ZM80,164a12,12,0,0,1,12-12h8v24H92A12,12,0,0,1,80,164Zm84,12h-8V152h8a12,12,0,0,1,0,24ZM72,108a12,12,0,1,1,12,12A12,12,0,0,1,72,108Zm88,0a12,12,0,1,1,12,12A12,12,0,0,1,160,108Z'></path>
					</svg>
					<p className='text-gray-600'>Identifying breed...</p>
					<Loader />
				</motion.div>
			) : (
				prediction && (
					<motion.div
						{...bounceInOnEnter}
						className='flex flex-col justify-center text-center gap-3'>
						<p className='text-gray-600'>The breed is</p>
						<p className='text-xl font-medium text-gray-700 capitalize'>
							{prediction}
						</p>
					</motion.div>
				)
			)}
		</>
	);
};

export default BreedIdentifier;
