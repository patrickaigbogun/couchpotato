export interface Movie {
  id: number;
  title: string;
  overview: string;
  posterPath: string | null;
  backdropPath: string | null;
  releaseDate: string;
  voteAverage: number;
  voteCount: number;
  adult: boolean;
  genreIds: number[];
  originalLanguage: string;
  originalTitle: string;
  popularity: number;
  video: boolean;
}

export interface MovieResponse {
  dates?: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
