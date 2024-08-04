'use client'

import { useState, useMemo, useEffect } from "react";
import { useWriteContract, useWaitForTransactionReceipt, useChainId, useReadContract } from "wagmi";
import { LayoutMain } from '../main-layout'
import { Step1 } from "./step1";
import { Step2 } from './step2'
import { Step5 } from './step-5'
import { setPrize, updatePrize } from '@/src/services/prizes'
import { abiPrizePoolFactory, FactoryAddress} from '@/src/contract-abi/poolPrize'
import { getEvent } from '@/src/services'
import { useQuery } from '@tanstack/react-query'
import { parseEther } from "viem";


const SelectChallengeType = () => {
  const chainId = useChainId();
  
  const query = useQuery({ queryKey: ['events'], queryFn: () => getEvent(chainId?.toString()) })
  const [selectedPrize, setSelectedChallenge] = useState<string>();
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<any>({
    title: '',
    description: '',
    totalPrizePool: 0,
    prizeUser: 0,
    minimumClaim: 0,
    PriceBurn: 0,
    deadline: '',
  });
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const { isLoading } = useWaitForTransactionReceipt({
    hash,
  });


  const isWriting = useMemo(() => {
    return isPending || isLoading || loading;
  }, [isPending, isLoading, loading]); 

  const {
    data,
    isFetching,
    refetch
  } = useReadContract({
    address: FactoryAddress as `0x${string}`,
    abi: abiPrizePoolFactory,
    functionName: "getPoolPrizes",
    query: {
      refetchOnWindowFocus: false,
      enabled: false,
      select(data) {
        return data as string[]
      },
    },
  });

  const submitChallenge = async() => {
    setLoading(true)
    const prizeId = await setPrize({
      title: formData.title,
      description: formData.description,
      pool_type: selectedPrize as string,
      user_reward: formData.prizeUser,
      required_token_amount: formData.minimumClaim,
      total_prize: formData.totalPrizePool,
      creator: query?.data?.event_id,
      claimed_address: []
    })

    writeContract({
      abi: abiPrizePoolFactory,
      address: FactoryAddress as `0x${string}`,
      functionName: 'createPoolPrize',
       args: [
        '0x7019Ddf4A14Caaf33babef107908F80E3EBd123F',
        prizeId,
        Number(formData.minimumClaim),
        Number(formData.prizeUser),
        Number(formData.PriceBurn)
       ],
       value: parseEther(formData.totalPrizePool)
    })
    setLoading(false)
  
  }

  const handleUpdatePrize = () => {
    if (!data?.length) return
    updatePrize(query?.data?.event_id, data?.[data?.length -1] as string)
  }

  useEffect(() => {
    if (!isWriting && hash) {
      setStep(2)
      setTimeout(() => {
        refetch()
        setTimeout(() => {
          handleUpdatePrize()
        }, 1000)
      }, 1000)
    }
  }, [isWriting, hash, data])


  const steps = [
    <Step1 selectedChallenge={selectedPrize} setSelectedPrize={setSelectedChallenge} setStep={setStep} />,
    <Step2 formData={formData} isWriting={isWriting} setFormData={setFormData} selectedChallenge={selectedPrize} submitChallenge={submitChallenge} />,
    <Step5 />
  ]

  return <LayoutMain>
   {steps[step]}
  </LayoutMain>
};

export default SelectChallengeType;
