import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface Props {
    onImageUpload: (imageUrl: string) => void;
	setFileName: (fileName: string) => void;
}

const ImageUploader = ({ onImageUpload, setFileName }: Props) => {

	const onDrop = useCallback(
		(files: File[]) => {
			const file = files[0];

			if (file) {
				const imageUrl = URL.createObjectURL(file);
				onImageUpload(imageUrl);
				setFileName(file.name);
			}
		},
		[onImageUpload]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: { 'image/*': [] },
		onDrop,
	});

	return (
		<div
			{...getRootProps()}
			className='flex flex-col justify-center gap-4 h-[150px] w-[85vw] min-w-[300px] md:w-[450px] items-center rounded-md border-2 border-dashed text-sm cursor-pointer 
transition-all duration-300 hover:bg-gray-200/30 px-4'>
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
					<span className='font-semibold mr-1'>Drag & drop</span> an
					image here, or
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
	);
};

export default ImageUploader;
