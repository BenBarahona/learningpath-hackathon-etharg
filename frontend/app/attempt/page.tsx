'use client'

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from "wagmi";
import { Box, Text, Button } from '@chakra-ui/react';
import { getQuestionsChallenges } from '@/src/services'
import { useQuery } from '@tanstack/react-query'
import { QuestionCard } from '@/src/components/questionCard'
import { challengeAbi, challengeAddress} from '@/src/contract-abi/challenge'

const AttemptPage = () => {
    
    const searchParams = useSearchParams()
    const router = useRouter();
    const { address } = useAccount()
    const query = useQuery({ queryKey: ['questions_challenge', searchParams.get('challenge')], queryFn: () => getQuestionsChallenges(searchParams.get('challenge') as string), select(data) {
      return data as any
    }, })
    

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [correct, setCorrect] = useState(0);
    const [finish, setFinish] = useState(false);

    const { data: hash, error, isPending, writeContract } = useWriteContract();
  
    const { isLoading } = useWaitForTransactionReceipt({
      hash,
    });

    const isWriting = useMemo(() => {
      return isPending || isLoading;
    }, [isPending, isLoading]); 

    const handleSelectOption = (value: string) => {
      setSelectedOption(value);
    };

    const handleNextQuestion = () => {
      if (query.data?.[currentQuestionIndex]?.options?.[selectedOption]?.isCorrect) {
        setCorrect((prev)=>prev+1)
      }
      if (currentQuestionIndex < Number(query.data?.length)- 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption('');
      } else {
        handleSubmitQuest()
        alert(`Quiz completed!, you answered, ${correct} questions correctly`);
        setFinish(true)
      }
    };

    const handleSubmitQuest = () => {

      writeContract({
        abi: challengeAbi,
        address: challengeAddress as `0x${string}`,
        functionName: 'userCompletedChallenge',
        args: [
          address,
          searchParams.get('challenge'),
          correct
        ],
      })
    }

    return (
      <Box p="8" bg="gray.100" minH="100vh">
      <Text fontSize="3xl" fontWeight="bold" mb="8" textAlign="center">
        Quiz
      </Text>
      <QuestionCard
        question={query.data?.[currentQuestionIndex]}
        onSelectOption={handleSelectOption}
        selectedOption={selectedOption}
        setCorrect={setCorrect}
      />
      {finish
        ?<Button onClick={()=> router.push('/action')} isLoading={isWriting} colorScheme="teal" mt="4">
          Regresar al home
        </Button>
        : <Button onClick={handleNextQuestion} isLoading={isWriting} colorScheme="teal" mt="4">
        Continuar
      </Button>
        }
      </Box>
    );
  };

  const WrappedAttempt = () => {
    return <Suspense>
      <AttemptPage />
    </Suspense>
  }

  export default WrappedAttempt