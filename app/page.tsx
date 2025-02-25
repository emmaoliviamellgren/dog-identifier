import BreedIdentifier from './components/BreedIdentifier';
import Footer from './components/Footer';

export default function Home() {
	return (
		<main className='h-screen w-screen flex flex-col justify-center items-center bg-gray-100 selection:bg-slate-300/30'>
			<section className='flex flex-col gap-16 items-center'>
				<h2 className='text-5xl font-bold bg-clip-text bg-gradient-to-b from-gray-400 to-gray-800 text-transparent tracking-tight'>
					Identify the Breed
				</h2>
				<BreedIdentifier />
			</section>
			<Footer />
		</main>
	);
}
