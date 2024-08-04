import React from 'react';
import { Box, Button, Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';

export const Step4 = () => {

  return (
    <Box padding="6" boxShadow="lg" bg="white">
      <Text fontSize="xl" fontWeight="bold" marginBottom="4">4. Setup Total Challenge Reward</Text>
      <FormControl id="total-challenge-reward" isRequired>
        <FormLabel>Total Challenge Reward </FormLabel>
        <Input placeholder="0 $PATH" defaultValue={0} type="number" />
      </FormControl>
      <Text fontSize="sm" color="gray.500" marginTop="2">
        Important: The total reward for the challenge will be split evenly between all questions added,
        with players receiving the corresponding amount of $PATH depending on how many correct answers they have.
      </Text>
      <Box marginTop="4">
        <Text>Total Reward: 0 $PATH</Text>
        <Text>Amount of Questions: 2 questions</Text>
        <Text>Reward per Question: 0 $PATH</Text>
      </Box>
      <Flex justifyContent="flex-end" marginTop="6">
        <Button colorScheme="orange" disabled>
          Continue
        </Button>
      </Flex>
    </Box>
  );
};
