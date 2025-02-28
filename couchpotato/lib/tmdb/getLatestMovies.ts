import { Movie, MovieResponse } from '@/types/tmdb/movie';
import { tmdbApiKey, tmdbApiUrl } from '@/env.config';

export async function getLatestMovies(page: number = 1): Promise<MovieResponse> {
  if (!tmdbApiKey.apiKey) {
    throw new Error('TMDB API key is not configured');
  }

  const response = await fetch(
    `${tmdbApiUrl.apiKey}/movie/now_playing?api_key=${tmdbApiKey.apiKey}&language=en-US&page=${page}`,
    { next: { revalidate: 3600 } } // Cache for 1 hour
  );

  if (!response.ok) {
    throw new Error('Failed to fetch latest movies');
  }

  const data = await response.json();

  // Transform the TMDB response to match our Movie type
  const movies: Movie[] = data.results.map((movie: any) => ({
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    posterPath: movie.poster_path,
    backdropPath: movie.backdrop_path,
    releaseDate: movie.release_date,
    voteAverage: movie.vote_average,
    voteCount: movie.vote_count,
    adult: movie.adult,
    genreIds: movie.genre_ids,
    originalLanguage: movie.original_language,
    originalTitle: movie.original_title,
    popularity: movie.popularity,
    video: movie.video
  }));

  return {
    dates: data.dates,
    page: data.page,
    results: movies,
    total_pages: data.total_pages,
    total_results: data.total_results,
  };
}
