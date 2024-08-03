'use client'

import { useMemo, useCallback } from 'react';
import { useConnect, Connector } from "wagmi";
import { Box, Button, Container, Heading, Stack, Text,  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';
import { ConnectOption} from '@/src/components/connectors'

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { connectors, connect } = useConnect();
  
  const providers = useMemo(() => {
    const newConnectors = new Set();
    return connectors.filter(
      (connector) =>
        !newConnectors.has(connector.name) && newConnectors.add(connector.name)
    );
  }, [connectors]);

  const handleConnectWallet = useCallback(
    (connector: Connector) => {
      connect({ connector });
      onClose();
    },
    [connect, onClose]
  );


  return (
    <Container maxW="md" centerContent py={10}>
    <Box
      w="full"
      p={6}
      textAlign="center"
      boxShadow="lg"
      rounded="md"
      bg="white"
    >
      <Heading as="h1" size="lg" mb={6} color="teal.500">
        Learning Path
      </Heading>
      <Text mb={6} color="gray.600">
        Bienvenido a Learning Path. Por favor, selecciona una opción para continuar.
      </Text>
      <Stack spacing={4}>
        <Button colorScheme="teal" size="lg">
          Login como admin
        </Button>
        <Button variant="outline" size="lg" onClick={onOpen}>
        Login como jugador
        </Button>
      </Stack>
    </Box>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Connect Your Wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <div className="grid gap-2 mb-9">
          {providers?.map((connector: Connector) => (
            <ConnectOption
              key={connector.id}
              connector={connector}
              onClick={() => handleConnectWallet(connector)}
            />
          ))}
        </div>
          </ModalBody>
        </ModalContent>
      </Modal>
  </Container>
  );
}
