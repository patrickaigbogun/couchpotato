import { Movie } from "../tmdb/movie";

export type CardImageBgProps = {
	href:string
	imageSrc: string;
	alt: string;
	title?: string;
	tagline?: string;
	date: Date;
	author: string;
	excerpt: string;
	// reuse: string;
	className?: string;
};

export type MovieType = {
	_id: string;
	slug: string;
	image: string;
	alt?: string;
	title: string;
	tagline?: string;
	releaseDate: Date;
	director: string;
	excerpt: string;
};

export type MoviesProps = {
	movies: MovieType[];
};

export type LogoProps = {
    src:string;
    alt:string;
    size:string;
    w:number;
    h:number;
}
