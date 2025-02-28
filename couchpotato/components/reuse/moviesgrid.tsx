// @/components/BlogPostsGrid



import { MoviesProps } from '@/types/reuse/index';
import {CardImageBg} from '@/components/reuse/cardimagebg';
import { watchMovieUrl } from '@/constants/url';
import { parseDate } from '@/lib/utils';
import { tmdbImageUrl } from '@/env.config';


export function MoviesGrid({ movies }: MoviesProps) {
	return (
		<section className='flex justify-center'>
			<div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
				{movies.map((movie) => {
					console.log(movie);
					return (
						<CardImageBg
							key={movie.id}
							href={watchMovieUrl(movie.id.toString())}
							imageSrc={`${tmdbImageUrl.apiKey}${movie.posterPath}`}
							alt={movie.title}
							title={movie.title}
							date={parseDate(movie.releaseDate).date || new Date()}							excerpt={movie.overview} 
							className='transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:brightness-50 group-hover:blur-sm'
						/>
					);
				})}
			</div>
		</section>
	);
}
