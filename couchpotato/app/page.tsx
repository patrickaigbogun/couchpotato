import { Suspense } from 'react';
import { MoviesGrid } from '@/components/reuse/moviesgrid';
import { getLatestMovies } from '@/lib/tmdb/getLatestMovies';
import { Box, Container } from '@radix-ui/themes';
import { BgParticles } from '@/components/ui/particle';
import LoadingCards from '@/components/reuse/loadingcards';

export default async function Home() {
	const movies = await getLatestMovies();
	return (
		<Box>
			<BgParticles />
			<Container>
				<Suspense fallback={<LoadingCards/>}>
					<MoviesGrid movies={movies.results} />
				</Suspense>
			</Container>
		</Box>
	);
}
