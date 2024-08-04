'use client'
import { Box, Flex, Text, VStack, HStack, Button, Icon, Avatar, Heading, Link } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FaTrophy, FaGift, FaUser } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { getChallengesByWallet } from '@/src/services'
import { useQuery } from '@tanstack/react-query'
import { useAccount } from 'wagmi';

export const LayoutMain = ({ children}: any) => {

    const { address } = useAccount()
    /* const router = useRouter()
    const query = useQuery({ queryKey: ['events'], queryFn: () => getChallengesByWallet(address as string) }) */

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
          <Link href="/new-challenge" style={{ textDecoration: "none" }} _hover={{ textDecoration: "none" }}>
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
        {children}
      </Flex>
    </Flex>
  );
};

// export default LayoutMain