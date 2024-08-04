import { Box, Button, Flex, Heading, Text, VStack, Image,  Input, Textarea,  FormControl, FormLabel } from "@chakra-ui/react";
import { challengeType } from '@/src/enum/challenge'

const ChallengeCard = ({ imageSrc, title, description, players, type, isSelected, onClick }: any) => (
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
      <Flex justifyContent="space-between">
        <Button variant="outline" size="sm">{players}</Button>
        <Button variant="outline" size="sm">{type}</Button>
      </Flex>
    </Box>
  );

export const Step1 = ({selectedChallenge,  setSelectedChallenge, setStep}: any) => {
    return <Box p={8}>
    <Heading mb={8}>Challenges</Heading>
    <Heading size="lg" mb={6}>Create New Challenge</Heading>
    <Heading size="md" mb={4}>1. Select Challenge Type</Heading>
    <Flex justifyContent="space-between" gap={4} mb={8}>
      <ChallengeCard
        imageSrc="https://path-to-multiple-choice-image.png"
        title="Multiple-Choice"
        description="Answer questions by selecting the correct option. Gain points for each correct answer and advance in your learning journey."
        players="Single Player"
        type="Async"
        isSelected={selectedChallenge === challengeType.MultipleChoice}
        onClick={() => setSelectedChallenge(challengeType.MultipleChoice)}
      />
      <ChallengeCard
        imageSrc="https://path-to-oracle-mode-image.png"
        title="Oracle Mode"
        description="Answer real-time questions validated by the API3 Oracle. Compete with others and see if your answer is the most accurate."
        players="Multiplayer"
        type="Live"
        isSelected={selectedChallenge === "Oracle Mode"}
        onClick={() => setSelectedChallenge("Oracle Mode")}
      />
      <ChallengeCard
        imageSrc="https://path-to-real-time-challenge-image.png"
        title="Real Time Challenge"
        description="Bet on your answers in a timed challenge. Pool prizes are distributed among players with the correct answers."
        players="Multiplayer"
        type="Live"
        isSelected={selectedChallenge === "Real Time Challenge"}
        onClick={() => setSelectedChallenge("Real Time Challenge")}
      />
    </Flex>
    <Button colorScheme="orange" onClick={() => setStep(1)} isDisabled={!selectedChallenge}>Continue</Button>
  </Box>
  }
  