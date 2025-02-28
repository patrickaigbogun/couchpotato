export interface Movie {
	id: number;
	title: string;
	overview: string;
	posterPath: string;
	backdropPath: string;
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

interface Genre {
	id: number
	name: string
}

interface ProductionCompany {
	id: number
	logo_path: string | null
	name: string
	origin_country: string
}

interface ProductionCountry {
	iso_3166_1: string
	name: string
}

interface SpokenLanguage {
	english_name: string
	iso_639_1: string
	name: string
}

export interface MovieDetails {
	adult: boolean
	backdrop_path: string 
	belongs_to_collection: {
		id: number
		name: string
		poster_path: string 
		backdrop_path: string 
	}
	budget: number
	genres: Genre[]
	homepage: string
	id: number
	imdb_id: string
	original_language: string
	original_title: string
	overview: string
	popularity: number
	poster_path: string
	production_companies: ProductionCompany[]
	production_countries: ProductionCountry[]
	release_date: string
	revenue: number
	runtime: number
	spoken_languages: SpokenLanguage[]
	status: string
	tagline: string
	title: string
	video: boolean
	vote_average: number
	vote_count: number
	cast?: {
		id: number
		name: string
		character: string
		profile_path: string
	}[]
}

export interface Content extends Omit<MovieDetails, 'id' | 'genres' | 'cast'> {
	id: string;
	genres: string[];
	cast: {
		id: number;
		name: string;
		character: string;
		profilePath: string;
	}[];
	posterPath: string;
	backdropPath: string;
}