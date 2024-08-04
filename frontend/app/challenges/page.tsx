'use client'

import { Box, Text, SimpleGrid } from '@chakra-ui/react';
import { ChallengeCard } from '@/src/components/challengeCard'
import { getChallenges } from '@/src/services'
import { useQuery } from '@tanstack/react-query'
import { pathAddress, abiERC20 } from '@/src/contract-abi/erc20'
import { useReadContract, useAccount } from 'wagmi'

const ChallengesPage = () => {

    const query = useQuery({ queryKey: ['challenges'], queryFn: getChallenges })
    const { address } = useAccount()
    const {
      data,
    } = useReadContract({
      address: pathAddress as `0x${string}`,
      abi: abiERC20,
      functionName: "balanceOf",
      args: [address]
    });

    return (
      <Box p="8" bg="gray.100" minH="100vh">
        <Text fontSize="3xl" fontWeight="bold" mb="8" textAlign="center">
          Challenges
        </Text>
        <Text fontSize="3xl" fontWeight="bold" mb="8" textAlign="center">
          you have {Number(data)} $PATH 
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="8">
          {query?.data?.map((challenge, index) => (
            <ChallengeCard key={index} {...challenge} pathsRequired={data ?? 0} />
          ))}
        </SimpleGrid>
      </Box>
    );
  };

  export default ChallengesPage