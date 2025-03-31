import { Movie, MovieResponse } from '@/types/tmdb/movie';
import { TMDB } from '@/constants/tmdb';

export async function getLatestAnime(page: number = 1): Promise<MovieResponse> {
	if (!TMDB.apiKey) {
		throw new Error('TMDB API key is not configured');
	}

	// First, we need to get the anime keyword ID
	// According to TMDB, anime has keyword ID 210024
	const ANIME_KEYWORD_ID = 210024;

	// Fetch movies with the anime keyword
	const response = await fetch(
		`${TMDB.apiUrl}discover/movie?api_key=${TMDB.apiKey}&with_keywords=${ANIME_KEYWORD_ID}&language=en-US&sort_by=primary_release_date.desc&page=${page}`,
		// { next: { revalidate: 3600 } } // Cache for 1 hour
	);

	if (!response.ok) {
		throw new Error('Failed to fetch anime movies');
	}

	const data = await response.json();

	// Transform the TMDB response to match our Movie type
	const animes: Movie[] = data.results.map((anime: any) => ({
		id: anime.id,
		title: anime.title,
		overview: anime.overview,
		posterPath: anime.poster_path,
		backdropPath: anime.backdrop_path,
		releaseDate: anime.release_date,
		voteAverage: anime.vote_average,
		voteCount: anime.vote_count,
		adult: anime.adult,
		genreIds: anime.genre_ids,
		originalLanguage: anime.original_language,
		originalTitle: anime.original_title,
		popularity: anime.popularity,
		video: anime.video
	}));

	return {
		page: data.page,
		results: animes,
		total_pages: data.total_pages,
		total_results: data.total_results,
		dates: data.dates
	};
}