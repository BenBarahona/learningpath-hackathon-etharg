'use client'

import { Box, Button, Center, Flex, Heading, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useChainId } from 'wagmi';
import { zuAuthPopup } from '@pcd/zuauth'
import { authenticate } from "@pcd/zuauth/server";
import { getEvent } from '@/src/services'
import { useQuery } from '@tanstack/react-query'


export default function Home() {
  const chainId = useChainId();
  const router = useRouter()

  const query = useQuery({ queryKey: ['events'], queryFn: () => getEvent(chainId?.toString()) })


  const watermark = "1398695278489937988729199077842522490498199058369"
  const eventId = query?.data?.event_id;
  const eventName =  query?.data?.event_name;

  const configs:any = [
    {
      "pcdType": "eddsa-ticket-pcd",
      "publicKey": [
        "1ebfb986fbac5113f8e2c72286fe9362f8e7d211dbc68227a468d7b919e75003",
        "10ec38f11baacad5535525bbe8e343074a483c051aa1616266f3b1df3fb7d204"
      ],
      eventId,
      eventName
    }
  ]

  const onOpenAdmin = async () => {
    if(query.isLoading) return;

    const result = await zuAuthPopup({
      fieldsToReveal: {
          revealTicketId: true,
          },
          watermark,
          config: configs
        })
        if(result.type === "pcd") {
            try {

              const pcd = await authenticate(result.pcdStr, watermark, configs);
       
              if (pcd.claim.partialTicket.ticketId) {
                  router.push('/admin-home');
              }
            } catch (e) {
              console.log("Failed", e)
            }
        }
  }

  return (
    <Box 
      position="relative" 
      height="100vh" 
      overflow="hidden"
    >
      <Image 
        src={'/banner.png'} 
        alt="Background" 
        layout="fill" 
        objectFit="cover"
        style={{ zIndex: -1 }}
      />
      <Box 
        position="absolute" 
        top="0" 
        left="0" 
        right="0" 
        padding="20px" 
        display="flex" 
        justifyContent="space-between"
        bg="rgba(0, 0, 0, 0.5)"
      >
        <Heading size="lg" color="white">Learning Path</Heading>
        <Flex gap="4">
          <Button colorScheme="orange" onClick={onOpenAdmin}>Create Challenge</Button>
          <Button colorScheme="orange" onClick={() => router.push('/challenges')}>Start Earning</Button>
        </Flex>
      </Box>
      <Center height="100vh" flexDirection="column">
        <Text fontSize="4xl" fontWeight="bold" color="white" bg="rgba(0, 0, 0, 0.5)" p="5" borderRadius="md">
          Start your learning path, become the best builder onchain
        </Text>
        <Flex mt="6" gap="4">
          <Button colorScheme="orange" size="lg" onClick={onOpenAdmin}>Create Challenge</Button>
          <Button colorScheme="orange" size="lg" onClick={() => router.push('/challenges')}>Start Earning</Button>
        </Flex>
      </Center>
    </Box>
  );
}
