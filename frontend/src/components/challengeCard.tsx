import Link from 'next/link';
import { Box, Text, Button } from '@chakra-ui/react';

export const ChallengeCard = ({ creator_address, description, quest_type, title, id }: any) => {
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
        <Link href={`attempt?challenge=${id}`}>
          <Button colorScheme="teal" size="sm">
            View Challenge
          </Button>
        </Link>
      </Box>
    );
  };