// @/components/BlogPostsGrid



import { MoviesProps } from '@/types/reuse/index';
import {CardImageBg} from '@/components/reuse/cardimagebg';


export function MoviesGrid({ movies }: MoviesProps) {
	return (
		<section className='flex justify-center'>
			<div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
				{movies.map((movie) => {
					console.log(movie);
					return (
						<CardImageBg
							key={movie._id}
							href={`/movies/${movie.slug}`}
							imageSrc={movie.image}
							alt={movie.alt || 'Movie poster'}
							title={movie.title}
							tagline={movie.tagline}
							date={movie.releaseDate}
							author={movie.director}
							excerpt={movie.excerpt}
							className='transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:brightness-50 group-hover:blur-sm'
						/>
					);
				})}
			</div>
		</section>
	);
}
