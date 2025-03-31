import { CardProps } from "@radix-ui/themes";
import { Movie } from "../tmdb/movie";

export type CardImageBgProps = {
	href:string
	imageSrc: string;
	alt: string;
	title?: string;
	tagline?: string;
	date: Date;
	author?: string;
	excerpt: string;
	// reuse: string;
	className?: string;
	size:CardProps['size'];
	variant: CardProps['variant']
};

export type MovieType = {
	_id: Movie['id'];
	slug: Movie['title'];
	image: Movie['posterPath'];
	alt?: Movie['title'];
	title: Movie['title'];
	tagline?: Movie['overview'];
	releaseDate: Movie['releaseDate'];
	director: string;
	excerpt: string;
};

export type MoviesProps = {
	movies: Movie[];
};

export type LogoProps = {
	href?: string;
    src:string;
    alt:string;
    size:string;
    w:number;
    h:number;
}
