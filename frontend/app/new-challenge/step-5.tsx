import React from 'react';
import { Button, Center, Text } from '@chakra-ui/react';

export const Step5 = () => {
  return (
    <Center height="100vh" className="w-full">
      <div>
        <Text fontSize="2xl" fontWeight="bold" align='center' marginBottom="4">Congratulations!</Text>
        <Text fontSize="lg" marginBottom="8" align='center'>
          Your new "Scroll Onboarding" challenge was successfully launched
        </Text>
        <Center>
            <Button colorScheme="orange" size="lg">Go To Challenges</Button>
        </Center>
      </div>
    </Center>
  );
};