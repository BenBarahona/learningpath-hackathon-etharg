'use client'

import { useState, useMemo, useEffect } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { LayoutMain } from '../main-layout'
import { Step1 } from "./step1";
import { Step2 } from './step2'
import { Step5 } from './step-5'
import { setPrize } from '@/src/services/prizes'
import { challengeAbi, challengeAddress} from '@/src/contract-abi/challenge'

const SelectChallengeType = () => {
  const [selectedPrize, setSelectedChallenge] = useState<string>();
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<any>({
    title: '',
    description: '',
    totalPrizePool: 0,
    prizeUser: 0,
    minimumClaim: 0,
    deadline: '',
  });
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const { isLoading } = useWaitForTransactionReceipt({
    hash,
  });

  const isWriting = useMemo(() => {
    return isPending || isLoading || loading;
  }, [isPending, isLoading, loading]); 

  const submitChallenge = async() => {
    setLoading(true)
    await setPrize({
      title: formData.title,
      description: formData.description,
      pool_type: selectedPrize as string,
      user_reward: formData.prizeUser,
      required_token_amount: formData.minimumClaim,
      total_prize: formData.totalPrizePool,
      claimed_address: []
    })

    setLoading(false)
  
  }

  useEffect(() => {
    if (!isWriting && hash) {
      setStep(2)
    }
  }, [isWriting, hash])


  const steps = [
    <Step1 selectedChallenge={selectedPrize} setSelectedPrize={setSelectedChallenge} setStep={setStep} />,
    <Step2 formData={formData} setFormData={setFormData} selectedChallenge={selectedPrize} submitChallenge={submitChallenge} />,
    <Step5 />
  ]

  return <LayoutMain>
   {steps[step]}
  </LayoutMain>
};

export default SelectChallengeType;
