import { getLatestTvShows } from '@/lib/tmdb/getLatestTvShows';
import { Box, Container, Heading, Text } from '@radix-ui/themes';
import Image from 'next/image';

export default async function TestTvShowsPage() {
  const tvShowsData = await getLatestTvShows();
  
  return (
    <Container my={'9'}>
      <Heading size="6" mb="4">TV Shows Test Page</Heading>
      <Text mb="4">Total results: {tvShowsData.total_results}</Text>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tvShowsData.results.map((show) => (
          <Box key={show.id} className="border rounded-md p-3">
            {show.poster_path && (
              <div className="relative h-64 mb-2">
                <Image 
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt={show.name}
                  fill
                  className="object-cover rounded"
                  loading='lazy'
                />
              </div>
            )}
            <Heading size="3">{show.name}</Heading>
            <Text size="2" color="gray">
              {show.first_air_date?.split('-')[0]} • {show.vote_average}/10
            </Text>
            <Text size="2" className="line-clamp-3 mt-2">
              {show.overview}
            </Text>
            {/* <Text size="1" color="gray" className="mt-2">
              {show.?.join(', ')}
            </Text> */}
          </Box>
        ))}
      </div>
    </Container>
  );
}