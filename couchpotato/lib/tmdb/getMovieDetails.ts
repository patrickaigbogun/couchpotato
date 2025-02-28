import { getMovieUrl } from "@/constants/url"
import { tmdbApiKey, tmdbApiUrl } from "@/env.config"
import { MovieDetails } from "@/types/tmdb/movie"


export async function getMovieDetails(id: string): Promise<MovieDetails> {
  if (!tmdbApiUrl.apiKey) {
    throw new Error('TMDB_API_KEY is not defined')
  }

  try {
    // Fetch movie details
    const movieResponse = await fetch(getMovieUrl(id),      
    { next: { revalidate: 3600 } } // Cache for 1 hour
    )

    if (!movieResponse.ok) {
      throw new Error('Failed to fetch movie details')
    }

    const movieData = await movieResponse.json()

    // Fetch cast details
    const creditsResponse = await fetch(
      `${tmdbApiUrl.apiKey}/movie/${id}/credits?api_key=${tmdbApiKey.apiKey}&language=en-US`,
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
