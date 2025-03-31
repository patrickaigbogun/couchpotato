import { Content, MovieDetails } from '@/types/tmdb/movie';
import { TMDB } from '@/constants/tmdb';
import { getMovieUrl, getCreditsUrl } from '@/constants/url';

export async function getAnimeDetails(animeId: string): Promise<Content> {
	if (!TMDB.apiKey) {
		throw new Error('TMDB API key is not configured');
	}

	try {
		// Fetch the anime details
		const detailsResponse = await fetch(getMovieUrl(animeId));

		if (!detailsResponse.ok) {
			throw new Error(`Failed to fetch anime details: ${detailsResponse.statusText}`);
		}

		const animeDetails: MovieDetails = await detailsResponse.json();

		// Fetch the credits to get cast information
		const creditsResponse = await fetch(getCreditsUrl(animeId));

		if (!creditsResponse.ok) {
			throw new Error(`Failed to fetch anime credits: ${creditsResponse.statusText}`);
		}

		const creditsData = await creditsResponse.json();

		// Transform the data to match our Content interface
		const content: Content = {
			id: animeId,
			adult: animeDetails.adult,
			backdrop_path: animeDetails.backdrop_path,
			backdropPath: animeDetails.backdrop_path,
			belongs_to_collection: animeDetails.belongs_to_collection,
			budget: animeDetails.budget,
			genres: animeDetails.genres.map(genre => genre.name),
			homepage: animeDetails.homepage,
			imdb_id: animeDetails.imdb_id,
			original_language: animeDetails.original_language,
			original_title: animeDetails.original_title,
			overview: animeDetails.overview,
			popularity: animeDetails.popularity,
			poster_path: animeDetails.poster_path,
			posterPath: animeDetails.poster_path,
			production_companies: animeDetails.production_companies,
			production_countries: animeDetails.production_countries,
			release_date: animeDetails.release_date,
			revenue: animeDetails.revenue,
			runtime: animeDetails.runtime,
			spoken_languages: animeDetails.spoken_languages,
			status: animeDetails.status,
			tagline: animeDetails.tagline,
			title: animeDetails.title,
			video: animeDetails.video,
			vote_average: animeDetails.vote_average,
			vote_count: animeDetails.vote_count,
			cast: creditsData.cast?.slice(0, 10).map((actor: { id: number; name: string; character: string; profile_path: string | null }) => ({
				id: actor.id,
				name: actor.name,
				character: actor.character,
				profilePath: actor.profile_path
			})) || []
		};

		return content;
	} catch (error) {
		console.error('Error fetching anime details:', error);
		throw error;
	}
}
