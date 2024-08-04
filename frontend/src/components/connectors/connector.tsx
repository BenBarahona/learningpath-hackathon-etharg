"use client";
import { useCallback, useState, useEffect } from "react";
import { Connector } from "wagmi";
import { Button } from '@chakra-ui/react';

interface ConnectorProps {
  readonly connector: Connector;
  readonly onClick: () => void;
}

export const ConnectOption = ({ connector, onClick }: ConnectorProps) => {
  const [isReady, setIsReady] = useState(false);

  const settingReady = useCallback(async () => {
    const ready = !!(await connector.getProvider());
    setIsReady(ready);
  }, [connector]);

  useEffect(() => {
    settingReady();
  }, [connector, settingReady]);

  return (
    <Button colorScheme="teal" size="lg"
      onClick={onClick}
      disabled={!isReady}
    >
      {connector.name}
    </Button>
  );
};