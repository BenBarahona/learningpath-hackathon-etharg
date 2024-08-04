'use client'

import { useState, useMemo, useEffect } from "react";
import { useWriteContract, useWaitForTransactionReceipt, useChainId } from "wagmi";
import { LayoutMain } from '../main-layout'
import { Step1 } from "./step1";
import { Step2 } from './step2'
import { Step3 } from './step3'
import { Step4 } from './step-4'
import { Step5 } from './step-5'
import { setChallenge } from '@/src/services/challenges'
import { challengeAbi, challengeAddress} from '@/src/contract-abi/challenge'
import { getEvent } from '@/src/services'
import { useQuery } from '@tanstack/react-query'

const SelectChallengeType = () => {

  const chainId = useChainId();

  const query = useQuery({ queryKey: ['events'], queryFn: () => getEvent(chainId?.toString()) })
  const [selectedChallenge, setSelectedChallenge] = useState<string>();
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [rewards, setRewards] = useState(0)
  const [formData, setFormData] = useState<any>({
    title: '',
    description: '',
    balance: 0,
    deadline: '',
    questions: []
  });
  const [currentQuestion, setCurrentQuestion] = useState<any>([]); 
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  
  const { isLoading } = useWaitForTransactionReceipt({
    hash,
  });

  const isWriting = useMemo(() => {
    return isPending || isLoading || loading;
  }, [isPending, isLoading, loading]); 

  const submitChallenge = async() => {
    setLoading(true)
    const challengeId = await setChallenge({
      title: formData.title,
      description: formData.description,
      challengeType: selectedChallenge as string,
      startTime: new Date(),
      endTime: formData.deadline,
      creator: query?.data?.event_id
    }, currentQuestion)
    
    writeContract({
      abi: challengeAbi,
      address: challengeAddress as `0x${string}`,
      functionName: 'CreateMultipleChoiceChallenge',
      args: [challengeId, formData.balance, rewards, currentQuestion.length],
    })
    setLoading(false)
   
  }


  useEffect(() => {
    if (!isWriting && hash) {
      setStep(4)
    }
  }, [isWriting, hash])

  const steps = [
    <Step1 selectedChallenge={selectedChallenge} setSelectedChallenge={setSelectedChallenge} setStep={setStep} />,
    <Step2 formData={formData} setFormData={setFormData} setStep={setStep} selectedChallenge={selectedChallenge} />,
    <Step3 currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion}  setStep={setStep} />,
    <Step4 isWriting={isWriting} questionLength={currentQuestion.length} setReward={setRewards} reward={rewards} submitChallenge={submitChallenge} />,
    <Step5 />
  ]

  return <LayoutMain>
   {steps[step]}
  </LayoutMain>
};

export default SelectChallengeType;
