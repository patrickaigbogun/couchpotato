"use client";

import { Box, Card, Flex, Grid } from '@radix-ui/themes';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const SkeletonPulse = styled.div`
  display: inline-block;
  height: 100%;
  width: 100%;
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0.05) 25%, 
    rgba(255, 255, 255, 0.1) 50%, 
    rgba(255, 255, 255, 0.05) 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: inherit;
`;

const SkeletonCard = () => (
  <Card className="p-0 h-[18rem] w-52 relative overflow-hidden shadow-lg rounded-3xl bg-gray-800">
    <SkeletonPulse />
    <Box className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black via-gray-950/30 to-transparent">
      <Box className="space-y-3">
        <Box className="h-6 w-4/5 bg-gray-700 rounded-md overflow-hidden">
          <SkeletonPulse />
        </Box>
        <Box className="h-4 w-3/5 bg-gray-700 rounded-md overflow-hidden">
          <SkeletonPulse />
        </Box>
        <Box className="h-3 w-2/5 bg-gray-700 rounded-md overflow-hidden">
          <SkeletonPulse />
        </Box>
      </Box>
    </Box>
  </Card>
);

export default function LoadingCards() {
  return (
    <Flex direction="column" gap="4">
      <Grid columns={{initial: "2", xs: "3", sm: "4", md: "5", lg: "6"}} gap="4" width="auto">
        {Array(12).fill(0).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </Grid>
    </Flex>
  );
}
