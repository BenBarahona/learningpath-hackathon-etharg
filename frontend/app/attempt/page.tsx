'use client'

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { Box, Text, Button } from '@chakra-ui/react';
import { getQuestionsChallenges } from '@/src/services'
import { useQuery } from '@tanstack/react-query'
import { QuestionCard } from '@/src/components/questionCard'

const AttemptPage = () => {
    
    const searchParams = useSearchParams()

    const query = useQuery({ queryKey: ['questions_challenge', searchParams.get('challenge')], queryFn: () => getQuestionsChallenges(searchParams.get('challenge') as string) })

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');

      const handleSelectOption = (value: string) => {
        setSelectedOption(value);
      };

      const handleNextQuestion = () => {
        if (currentQuestionIndex < Number(query.data?.length)- 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedOption('');
        } else {
          alert('Quiz completed!');
        }
      };

    return (
      <Box p="8" bg="gray.100" minH="100vh">
      <Text fontSize="3xl" fontWeight="bold" mb="8" textAlign="center">
        Quiz
      </Text>
      <QuestionCard
        question={query.data?.[currentQuestionIndex]}
        onSelectOption={handleSelectOption}
        selectedOption={selectedOption}
      />
      <Button onClick={handleNextQuestion} colorScheme="teal" mt="4">
        Continuar
      </Button>
    </Box>
    );
  };

  export default AttemptPage