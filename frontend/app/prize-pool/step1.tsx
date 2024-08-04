import { Box, Button, Flex, Heading, Text, VStack, Image,  Input, Textarea,  FormControl, FormLabel } from "@chakra-ui/react";
import { prizeType } from '@/src/enum/challenge'

const PrizeCard = ({ imageSrc, title, description, isSelected, onClick }: any) => (
    <Box
      border="1px solid"
      borderColor={isSelected ? "orange.500" : "gray.200"}
      borderRadius="md"
      p={4}
      onClick={onClick}
      cursor="pointer"
      bg={isSelected ? "orange.50" : "white"}
    >
      <Image src={imageSrc} alt={title} borderRadius="md" mb={4} />
      <Heading size="md" mb={2}>{title}</Heading>
      <Text mb={4}>{description}</Text>
    </Box>
  );

export const Step1 = ({selectedChallenge,  setSelectedPrize, setStep}: any) => {
    return <Box p={8}>
    <Heading mb={8}>Prizes</Heading>
    <Heading size="lg" mb={6}>Create New Prize</Heading>
    <Heading size="md" mb={4}>1. Select Prize Type</Heading>
    <Flex justifyContent="space-between" gap={4} mb={8}>
      <PrizeCard
        imageSrc="/images/prize_pool.png"
        title="Pool Prize"
        description="Set a pool prize and define the amount each player can claim. Players can make a single claim, with their prize deducted from the pool."
        isSelected={selectedChallenge === prizeType.PoolPrize}
        onClick={() => setSelectedPrize(prizeType.PoolPrize)}
      />
      <PrizeCard
        imageSrc="/images/quadratic.png"
        title="Quadratic Pool Prize"
        description="Set a pool prize and the number of players who can claim it. The prize is distributed exponentially among the players."
        isSelected={selectedChallenge === prizeType.QuadraticPoolPrize}
        onClick={() => setSelectedPrize(prizeType.QuadraticPoolPrize)}
      />
      <PrizeCard
        imageSrc="/images/pre-defined.png"
        title="Pre-Defined Prize"
        description="Define a set number of prizes and their amounts. Players receive corresponding rewards based on their performance."
        isSelected={selectedChallenge === prizeType.PreDefinedPrize}
        onClick={() => setSelectedPrize(prizeType.PreDefinedPrize)}
      />
    </Flex>
    <Button colorScheme="orange" onClick={() => setStep(1)} isDisabled={!selectedChallenge}>Continue</Button>
  </Box>
  }
  