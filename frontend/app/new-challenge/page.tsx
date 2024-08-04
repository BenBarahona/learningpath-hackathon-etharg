'use client'

import { useState } from "react";
import { LayoutMain } from '../main-layout'
import { Step1 } from "./step1";
import { Step2 } from './step2'
import { Step3 } from './step3'
import { Step4 } from './step-4'
import { Step5 } from './step-5'
import { setChallenge } from '@/src/services/challenges'

const SelectChallengeType = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<string>();
  const [step, setStep] = useState(0)
  const [rewards, setRewards] = useState(0)
  const [formData, setFormData] = useState<any>({
    title: '',
    description: '',
    balance: 0,
    deadline: '',
    questions: []
  });
  
  const [currentQuestion, setCurrentQuestion] = useState<any>([]); 

  const submitChallenge = async() => {
    await setChallenge({
      title: formData.title,
      description: formData.description,
      challengeType: selectedChallenge as string,
      startTime: new Date(),
      endTime: formData.deadline,
    }, currentQuestion)

    setStep(4)
  }


  const steps = [
    <Step1 selectedChallenge={selectedChallenge} setSelectedChallenge={setSelectedChallenge} setStep={setStep} />,
    <Step2 formData={formData} setFormData={setFormData} setStep={setStep} selectedChallenge={selectedChallenge} />,
    <Step3 currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion}  setStep={setStep} />,
    <Step4 questionLength={currentQuestion.length} setReward={setRewards} reward={rewards} submitChallenge={submitChallenge} />,
    <Step5 />
  ]

  return <LayoutMain>
   {steps[step]}
  </LayoutMain>
};

export default SelectChallengeType;



/* import React, { useState } from 'react';
import {
  Box, Button, FormControl, FormLabel, Input, Textarea, VStack,  Select,
  Checkbox
} from '@chakra-ui/react';
import { setChallenge as SetNewChallenge } from '@/src/services/challenges'
import { challengeType } from '@/src/enum/challenge'


const CreateChallenge = () => {
  const [challenge, setChallenge] = useState({
    title: '',
    description: '',
    challengeType: challengeType.MultipleChoice,
    startTime: new Date(),
    endTime: '',
  });

  const [questions, setQuestions] = useState([
    { content: '', options: [{ option: '', isCorrect: false }] }
  ]);

  const handleChallengeChange = (e: any) => {
    const { name, value } = e.target;
    setChallenge({ ...challenge, [name]: value });
  };

  const handleQuestionChange = (index: number, e: any) => {
    const { name, value } = e.target;
    const newQuestions = [...questions] as any;
    newQuestions[index][name] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex: number, oIndex: number, e: any) => {
    const { name, value } = e.target;
    const newQuestions = [...questions] as any;
    newQuestions[qIndex].options[oIndex][name] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (qIndex: number, oIndex: number, value: any) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex].isCorrect = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { content: '', options: [{ option: '', isCorrect: false }] }]);
  };

  const addOption = (qIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.push({ option: '', isCorrect: false });
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await SetNewChallenge(challenge as any, questions)
  };

  return (
    <Box p={6} rounded="md" bg="white">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="flex-start">
          <FormControl>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              id="title"
              name="title"
              value={challenge.title}
              onChange={handleChallengeChange}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea
              id="description"
              name="description"
              value={challenge.description}
              onChange={handleChallengeChange}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="challengeType">Challenge Type</FormLabel>
            <Select
                id="challengeType"
                name="challengeType"
                required>
            <option value={challengeType.MultipleChoice}>
                Multiple choice
            </option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="endTime">End Time</FormLabel>
            <Input
              id="endTime"
              name="endTime"
              type="datetime-local"
              value={challenge.endTime}
              onChange={handleChallengeChange}
            />
          </FormControl>
          {questions.map((question, qIndex) => (
            <Box key={qIndex} p={4} borderWidth="1px" borderRadius="lg" width="100%">
              <FormControl>
                <FormLabel>Question Content</FormLabel>
                <Input
                  name="content"
                  value={question.content}
                  onChange={(e) => handleQuestionChange(qIndex, e)}
                  required
                />
              </FormControl>
              {question.options.map((option, oIndex) => (
                <div key={oIndex} className="grid gap-2">
                  <FormLabel>Option</FormLabel>
                  <FormControl className="flex item-center gap-4 w-full">
                    <Input
                      name="option"
                      value={option.option}
                      onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                      required
                    />
                    <div className="flex-shrink-0 flex items-center">
                        <FormLabel>Is correct answer</FormLabel>
                        <Checkbox onChange={(event) => handleCorrectAnswerChange(qIndex, oIndex, event.target.checked)} />
                    </div>
                  </FormControl>
                </div>
              ))}
              <Button mt={2} onClick={() => addOption(qIndex)}>
                Add Option
              </Button>
            </Box>
          ))}
          <Button onClick={addQuestion}>Add Question</Button>
          <Button type="submit" colorScheme="teal" width="full">
            Create Challenge
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default CreateChallenge;
 */