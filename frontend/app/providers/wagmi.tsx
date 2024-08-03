"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider as Wagmi } from "wagmi";
import { config } from './config'

interface WagmiProviderProps {
  children: React.ReactNode;
}

export const WagmiProvider = ({ children }: WagmiProviderProps) => {
  return (
    <Wagmi config={config}>
      <QueryClientProvider client={new QueryClient()}>
        {children}
      </QueryClientProvider>
    </Wagmi>
  );
};
