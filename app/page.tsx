import BreedIdentifier from './components/BreedIdentifier';

export default function Home() {
	return (
		<main className='h-screen w-screen flex flex-col justify-center items-center bg-gray-100 selection:bg-slate-300/30'>
			<section className='flex flex-col gap-8 md:gap-16 items-center'>
				<h2 className='text-3xl font-medium bg-clip-text bg-gradient-to-b from-gray-400 to-gray-800 text-transparent tracking-tight'>
					Identify the Breed
				</h2>
				<BreedIdentifier />
			</section>
		</main>
	);
}
