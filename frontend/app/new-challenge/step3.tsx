import React, { useState } from 'react';
import {
  Box,
  Button,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Divider,
  useColorModeValue,
  Stack,
  Switch,
  Textarea,
} from '@chakra-ui/react';

export const Step3 = ({ currentQuestion, setCurrentQuestion, setStep }: any) => {
    const [createQuestion, setCreateQuestions] = useState<boolean>(false)
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);

    const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.target.value);
    };

    const handleAnswerChange = (index: number, value: string) => {
        const newAnswers = answers.map((answer, i) => (i === index ? value : answer));
        setAnswers(newAnswers);
    };

    const handleCorrectAnswerChange = (index: number) => {
        setCorrectAnswer(index);
    };

    const handleAddOption = () => {
        setAnswers([...answers, '']);
    };

    const handleConfirmQuestion = () => {
        const newQuestion = {
            content: question,
            options: answers.map((item, index) => ({ option: item, isCorrect: index === correctAnswer}))
        }
        const newAppend = [...currentQuestion, newQuestion]
        setCurrentQuestion(newAppend)
        setCreateQuestions(false)
        setQuestion('')
        setAnswers(['', '', '', '']);
        setCorrectAnswer(null);
    };


  return (
    <Box bg={useColorModeValue('white', 'gray.800')} p={5} className="w-full" mx="auto" rounded="lg" shadow="md">
      <Text fontSize="2xl" mb={5} fontWeight="bold">Create New Challenge</Text>
      <Text fontSize="xl" mt={10} mb={5} fontWeight="bold">3. Add questions</Text>
      {currentQuestion?.map((question: any, index:number) => (
        <Box
            p={4}
            key={index}
            className="bg-white rounded-lg shadow-md"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            marginBlock={4}
        >
            <Stack direction="row" justify="space-between" align="center">
                <Box>
                <Text fontSize="xs" color="gray.500" className="font-bold">QUESTION 1</Text>
                <Text fontSize="md" mt={1}>{question?.content}</Text>
                <Text fontSize="sm" color="gray.500" mt={1}>
                    {question?.options?.lenght} options - {false ? 'Multimedia' : 'No Multimedia'}
                </Text>
                </Box>
            </Stack>
        </Box>
      ))}
      
      {!createQuestion &&
        <VStack spacing={5} align="flex-start">
            <Button colorScheme="orange" className="w-full" onClick={() => setCreateQuestions(true)}>
            + Add New Question
            </Button>
        </VStack>
      }
      <Divider my={5} />
      {createQuestion &&
        <Box
        p={5}
        className="w-full mx-auto bg-white rounded-lg shadow-md"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        >
        <VStack spacing={5} align="flex-start">
            <FormControl>
            <FormLabel>Question</FormLabel>
            <Input
                placeholder="Enter question"
                value={question}
                onChange={handleQuestionChange}
            />
            </FormControl>
            {answers.map((answer, index) => (
                <FormControl key={index}>
                    <FormLabel>Answer {index + 1}</FormLabel>
                    <Stack direction="column">
                    <Input
                        placeholder={`Answer ${index + 1}`}
                        value={answer}
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                    />
                    <div className="flex items-center">
                        <FormLabel>This is the correct answer</FormLabel>
                        <Switch
                            isChecked={correctAnswer === index}
                            onChange={() => handleCorrectAnswerChange(index)}
                            colorScheme="orange"
                        />
                    </div>
                    </Stack>
                </FormControl>
            ))}
            <Button onClick={handleAddOption} colorScheme="teal">+ Add Option</Button>
            <Button onClick={handleConfirmQuestion} colorScheme="orange" mt={4}>Confirm Question</Button>
        </VStack>
        </Box>
      }
      {!createQuestion &&
        <Button className="w-full" colorScheme="orange" onClick={() => setStep(3)}>Continue</Button>
      }
    </Box>
  );
};
