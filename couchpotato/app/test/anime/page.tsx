import { getLatestAnime } from '@/lib/tmdb/getLatestAnime';
import { Box, Container, Heading, Text } from '@radix-ui/themes';
import Image from 'next/image';

export default async function TestAnimePage() {
  const animeData = await getLatestAnime();
  
  return (
    <Container my={'9'}>
      <Heading size="6" mb="4">Anime Test Page</Heading>
      <Text mb="4">Total results: {animeData.total_results}</Text>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {animeData.results.map((anime) => (
          <Box key={anime.id} className="border rounded-md p-3">
            {anime.posterPath && (
              <div className="relative h-64 mb-2">
                <Image 
                  src={`https://image.tmdb.org/t/p/w500${anime.posterPath}`}
                  alt={anime.title}
                  fill
                  className="object-cover rounded"
                />
              </div>
            )}
            <Heading size="3">{anime.title}</Heading>
            <Text size="2" color="gray">
              {anime.releaseDate?.split('-')[0]} • {anime.voteAverage.toFixed(1)}/10
            </Text>
            <Text size="2" className="line-clamp-3 mt-2">
              {anime.overview}
            </Text>
          </Box>
        ))}
      </div>
    </Container>
  );
}