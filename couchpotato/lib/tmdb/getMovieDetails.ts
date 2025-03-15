import { getCreditsUrl, getMovieUrl } from "@/constants/url"
import { TMDB } from "@/constants/tmdb"
import { MovieDetails } from "@/types/tmdb/movie"


export async function getMovieDetails(id: string): Promise<MovieDetails> {
	if (!TMDB.apiKey) {
		throw new Error(`${TMDB.apiKey} is not defined`)
	}

	try {
		// Fetch movie details
		const movieResponse = await fetch(getMovieUrl(id),
			{ next: { revalidate: 3600 } } // Cache for 1 hour
		)

		if (!movieResponse.ok) {
			console.error('Failed to fetch movie details:', movieResponse)
			throw new Error('Failed to fetch movie details')
		}

		const movieData = await movieResponse.json()

		// Fetch cast details
		const creditsResponse = await fetch(getCreditsUrl(id),			
		{ next: { revalidate: 3600 } }
		)

		if (!creditsResponse.ok) {
			throw new Error('Failed to fetch movie credits')
		}

		const creditsData = await creditsResponse.json()

		return {
			...movieData,
			cast: creditsData.cast
				.slice(0, 10)
				.map((actor: any) => ({
					id: actor.id,
					name: actor.name,
					character: actor.character,
					profile_path: actor.profile_path,
				})),
		}
	} catch (error) {
		console.error('Error fetching movie data:', error)
		throw error
	}
}
