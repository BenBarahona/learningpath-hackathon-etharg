import { useDisconnect, useAccount } from "wagmi";
import { Button } from '@chakra-ui/react';
import { shortenAddress } from "@/src/utils";

export const DisconnectOption = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <Button colorScheme="teal" size="lg"
      onClick={() => disconnect()}
     
    >
      {shortenAddress(address)}
    </Button>
  );
};