'use client'

import { useMemo, useCallback } from 'react';
import { useConnect, Connector } from "wagmi";
import { Box, Button, Container, Heading, Stack, Text,  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';
import { ConnectOption} from '@/src/components/connectors'
import { zuAuthPopup } from '@pcd/zuauth'
import { authenticate } from "@pcd/zuauth/server";

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

  //TODO: Agarrar el eventID, eventName de Firebase
  //TODO: watermark agarrar del adress conectado
  const watermark = "1398695278489937988729199077842522490498199058369"
  const eventId = "5b0d5213-e656-55cd-967f-88c7b1d6e15f";
  const eventName = "Learning Path"
  const ticketId = "747a028b-0c73-5c48-9894-72519ec36a56";
  
  const configs:any = [
    {
      "pcdType": "eddsa-ticket-pcd",
      "publicKey": [
        "1ebfb986fbac5113f8e2c72286fe9362f8e7d211dbc68227a468d7b919e75003",
        "10ec38f11baacad5535525bbe8e343074a483c051aa1616266f3b1df3fb7d204"
      ],
      "productId": "da6513e4-d65a-5464-9b29-0f47d25f0a1a",
      "eventId": eventId,
      "eventName": eventName,
      "productName": "Admin"
    }
  ]

  const onOpenAdmin = async () => {
    console.log('use zupass')
    const result = await zuAuthPopup({
      fieldsToReveal: {
          revealTicketId: true,
          },
          watermark,
          config: configs
        })
        console.log(watermark);
  
        console.log("Zupass Result: ", result)
        if(result.type === "pcd") {
            try {
              console.log("PCD", result.pcdStr)

              const pcd = await authenticate(result.pcdStr, watermark, configs);
              console.log("Got PCD data: ", pcd.claim.partialTicket);
              //TODO: if pcd == ticketId, continuar
              
            } catch (e) {
              console.log("Failed", e)
            }
        }
  }


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
        <Button colorScheme="teal" size="lg" onClick={() => onOpenAdmin()}>
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
