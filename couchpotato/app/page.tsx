import { Suspense } from 'react';	
import { MoviesGrid } from '@/components/reuse/moviesgrid';
import { getLatestMovies } from '@/lib/tmdb/getLatestMovies';

export default async function Home() {
	const movies = await getLatestMovies();
		return (
		<Suspense fallback={<div>Loading...</div>}>
			<MoviesGrid movies={movies.results} />
		</Suspense>
	);
}
