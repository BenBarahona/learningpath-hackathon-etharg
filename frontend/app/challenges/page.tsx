'use client'

import { Box, Text, SimpleGrid } from '@chakra-ui/react';
import { ChallengeCard } from '@/src/components/challengeCard'
import { getChallenges } from '@/src/services'
import { useQuery } from '@tanstack/react-query'

const ChallengesPage = () => {

    const query = useQuery({ queryKey: ['challenges'], queryFn: getChallenges })

    return (
      <Box p="8" bg="gray.100" minH="100vh">
        <Text fontSize="3xl" fontWeight="bold" mb="8" textAlign="center">
          Challenges
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="8">
          {query?.data?.map((challenge, index) => (
            <ChallengeCard key={index} {...challenge} />
          ))}
        </SimpleGrid>
      </Box>
    );
  };

  export default ChallengesPage