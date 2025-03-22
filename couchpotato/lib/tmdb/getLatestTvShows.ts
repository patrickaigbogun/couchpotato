import { TMDB } from '@/constants/tmdb';
import { TVShow, AiringTodayResponse } from '@/types/tmdb/tvshow';

export async function getLatestTvShows(page: number = 1): Promise<AiringTodayResponse> {
  if (!TMDB.apiKey) {
    throw new Error('TMDB API key is not configured');
  }


  // Fetch latest TV shows
  const response = await fetch(
    `${TMDB.apiUrl}tv/airing_today?api_key=${TMDB.apiKey}&language=en-US&page=${page}`,
  );

  if (!response.ok) {
    const errorDetail = await response.text();
    console.error(`API Error: ${response.status} ${response.statusText}`, errorDetail);
    throw new Error(`Failed to fetch latest TV shows (${response.status}: ${response.statusText})`);
  }

  const data = await response.json();

 

  // Transform response to match TVShow type
  const tvShows: TVShow[] = data.results.map((show: any) => ({
    id: show.id,
    name: show.name,
    overview: show.overview,
    posterPath: show.poster_path || '',
    backdropPath: show.backdrop_path || '',
    firstAirDate: show.first_air_date || '',
    voteAverage: show.vote_average || 0,
    voteCount: show.vote_count || 0,
    genreIds: show.genre_ids || [],
    originalLanguage: show.original_language || '',
    originalName: show.original_name || '',
    popularity: show.popularity || 0,
    originCountry: show.origin_country || [],
    adult: show.adult || false,
    video: show.video || false
  }));

  return {
    page: data.page,
    results: tvShows,
    total_pages: data.total_pages,
    total_results: data.total_results
  };
}
