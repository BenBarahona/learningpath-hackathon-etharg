import { Box, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react';

export const QuestionCard = ({ question, onSelectOption, selectedOption }: any) => {
    return (
      <Box borderWidth="1px" borderRadius="lg" p="6" mb="4" bg="white">
        <Text fontSize="xl" fontWeight="bold" mb="4">
          {question?.content}
        </Text>
        <RadioGroup onChange={onSelectOption} value={selectedOption}>
          <Stack direction="column">
            {question?.options.map((option: any, index: number) => (
              <Radio
                key={index}
                value={String(index)}
                borderColor={selectedOption === String(index) ? 'blue.500' : 'gray.300'}
              >
                {option?.option}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      </Box>
    );
  };