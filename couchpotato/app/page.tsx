import { Suspense } from 'react';
import { MoviesGrid } from '@/components/reuse/moviesgrid';
import { getLatestMovies } from '@/lib/tmdb/getLatestMovies';
import { Box, Container } from '@radix-ui/themes';
import { BgParticles } from '@/components/ui/particle';
import LoadingCards from '@/components/reuse/loadingcards';
import Hero from "@/components/ui/hero";

export default async function Home() {
	const movies = await getLatestMovies();
	return (
		<main className="flex min-h-screen flex-col">
			<Hero />
			<Box>
				<BgParticles />
				<Container className='my-32' >
					<Suspense fallback={<LoadingCards/>}>
						<MoviesGrid movies={movies.results} />
					</Suspense>
				</Container>
			</Box>
		</main>
	);
}
