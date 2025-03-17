import { Suspense } from 'react';
import { MoviesGrid } from '@/components/reuse/moviesgrid';
import { getLatestMovies } from '@/lib/tmdb/getLatestMovies';
import { Box } from '@radix-ui/themes';
import { BgParticles } from '@/components/ui/particle';

export default async function Home() {
	const movies = await getLatestMovies();
	return (
		<Box>
			<BgParticles />
			<Suspense fallback={<div>Loading...</div>}>
				<MoviesGrid movies={movies.results} />
			</Suspense>
		</Box>
	);
}
