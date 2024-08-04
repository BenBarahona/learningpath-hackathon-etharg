'use client'
import { Box, Flex, Text, VStack, HStack, Button, Icon, Avatar, Heading, Link } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FaTrophy, FaGift, FaUser } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { getChallengesByWallet, getEvent, getPrizes } from '@/src/services'
import { useQuery } from '@tanstack/react-query'
import { useAccount, useChainId } from 'wagmi';

const AdminHome = () => {

  const { address } = useAccount()
  const router = useRouter()
  const chainId = useChainId();

  const event = useQuery({ queryKey: ['events'], queryFn: () => getEvent(chainId?.toString()) })

  const query = useQuery({ queryKey: ['events', event.data?.event_id], queryFn: () => getChallengesByWallet(event.data?.event_id), enabled: Boolean(event.data?.event_id) })

  const queryPrize = useQuery({ queryKey: ['prize', event.data?.event_id], queryFn: () => getPrizes(event.data?.event_id), enabled: Boolean(event.data?.event_id) })

  return (
    <Flex direction="column" minH="100vh" bg="gray.50">
      <Flex
        as="header"
        bg="white"
        borderBottom="1px solid"
        borderColor="gray.200"
        py={4}
        px={8}
        alignItems="center"
        justifyContent="space-between"
      >
        <Text fontSize="2xl" fontWeight="bold" fontFamily="monospace">Learning Path</Text>
        <Avatar name="scrolldevrel.eth" src="https://bit.ly/broken-link" />
      </Flex>
      <Flex flex="1" direction="row" py={8} px={8}>
        <VStack
          as="nav"
          bg="white"
          borderRight="1px solid"
          borderColor="gray.200"
          p={4}
          spacing={4}
          minW="250px"
          alignItems="flex-start"
        >
          <Link href="#" style={{ textDecoration: "none" }} _hover={{ textDecoration: "none" }}>
            <HStack spacing={4}>
              <Icon as={HiHome} />
              <Text>Home</Text>
            </HStack>
          </Link>
          <Link style={{ textDecoration: "none" }} _hover={{ textDecoration: "none" }}>
            <HStack spacing={4}>
              <Icon as={FaTrophy} />
              <Text>Challenges</Text>
            </HStack>
          </Link>
          <Link href="#" style={{ textDecoration: "none" }} _hover={{ textDecoration: "none" }}>
            <HStack spacing={4}>
              <Icon as={FaGift} />
              <Text>Prizes</Text>
            </HStack>
          </Link>
          <Link href="#" style={{ textDecoration: "none" }} _hover={{ textDecoration: "none" }}>
            <HStack spacing={4}>
              <Icon as={FaUser} />
              <Text>Profile</Text>
            </HStack>
          </Link>
        </VStack>
        <Box flex="1" p={8}>
          <Heading as="h1" mb={6}>Home Page</Heading>
          <Flex mb={6}>
            <Box border="1px solid" borderColor="gray.200" borderRadius="md" p={4} flex="1" mr={4}>
              <HStack justifyContent="space-between" mb={4}>
                <Text fontSize="lg" fontWeight="bold">Challenges</Text>
                <Button colorScheme="orange" size="sm" onClick={()=> router.push('/new-challenge')}>+ Create Challenge</Button>
              </HStack>
              <HStack justifyContent="space-between">
                <Text fontSize="3xl">{query.data?.length ?? 0}</Text>
                <Text fontSize="3xl">0</Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text>Active Challenges</Text>
                <Text>Closed Challenges</Text>
              </HStack>
            </Box>
            <Box border="1px solid" borderColor="gray.200" borderRadius="md" p={4} flex="1">
              <HStack justifyContent="space-between" mb={4}>
                <Text fontSize="lg" fontWeight="bold">Prizes</Text>
                <Button colorScheme="orange" size="sm" onClick={()=> router.push('/prize-pool')}>+ Create Prize</Button>
              </HStack>
              <HStack justifyContent="space-between">
                <Text fontSize="3xl">{queryPrize.data?.length ?? 0}</Text>
                <Text fontSize="3xl">0</Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text>Active Prizes</Text>
                <Text>Closed Prizes</Text>
              </HStack>
            </Box>
          </Flex>
          <Box border="1px solid" borderColor="gray.200" borderRadius="md" p={4}>
            <Heading as="h2" size="md" mb={4}>Latest Activity</Heading>
            <Text>There isn’t any activity yet, create a challenge to start</Text>
            <Button mt={4} colorScheme="orange" onClick={() => router.push('/new-challenge') }>Create Challenge</Button>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default AdminHome