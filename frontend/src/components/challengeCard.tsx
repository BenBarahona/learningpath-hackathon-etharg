import Link from 'next/link';
import { Box, Text, Button } from '@chakra-ui/react';
import { useReadContract, useChainId } from 'wagmi'
import { challengeAbi, challengeAddress} from '@/src/contract-abi/challenge'
import { useQuery } from '@tanstack/react-query'
import { getEvent } from '@/src/services'

export const ChallengeCard = ({ creator_address, description, quest_type, title, id, pathsRequired }: any) => {

  const chainId = useChainId();
  const query = useQuery({ queryKey: ['events'], queryFn: () => getEvent(chainId?.toString()) })

  const {
    data
  } = useReadContract({
    address: challengeAddress as `0x${string}`,
    abi: challengeAbi,
    functionName: "getRequiredTokensForChallenge",
    args: [id],
    query: {
      enabled: Boolean(id)
    }
  });

  console.log(data, 'data')

    return (
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p="6"
        bg="white"
        boxShadow="lg"
      >
        <Text fontSize="xl" fontWeight="bold" mb="2">
          {title}
        </Text>
        <Text fontSize="sm" color="gray.500" mb="4">
          Created by: {creator_address}
        </Text>
        <Text mb="4">{description}</Text>
        <Text fontSize="sm" color="gray.500" mb="4">
          Quest Type: {quest_type}
        </Text>
        {Number(data) >= Number(pathsRequired)
           && <Link href={`attempt?challenge=${id}`}>
           <Button colorScheme="teal" size="sm">
             View Challenge
           </Button>
         </Link>
        }
        
      </Box>
    );
  };