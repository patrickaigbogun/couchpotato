'use client';

import { Box, Flex } from '@radix-ui/themes';
import Image from 'next/image';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const pulse = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const AnimatedLogo = styled.div`
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

export default function Loading() {
  return (
    <Box style={{ height: '100vh', width: '100%' }}>
      <Flex 
        align="center" 
        justify="center" 
        style={{ height: '100%', width: '100%' }}
      >
        <AnimatedLogo>
          <Image 
            src="/couchpotato_icon.png" 
            alt="CouchPotato Logo" 
            width={200}
            height={200}
            priority
          />
        </AnimatedLogo>
      </Flex>
    </Box>
  );
}
