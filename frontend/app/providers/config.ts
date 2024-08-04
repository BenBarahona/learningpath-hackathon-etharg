import { http, createConfig } from 'wagmi'
import { injected, walletConnect } from "wagmi/connectors";
import { scrollSepolia, scroll } from 'wagmi/chains'

export const config = createConfig({
  chains: [scrollSepolia, scroll],
  ssr: true,
  connectors: [
    injected({ target: "metaMask" }),
    walletConnect({ projectId: '6e7d5b2158b5ad861f807fb5eea33b9c' }),
  ],
  transports: {
    [scrollSepolia.id]: http(),
    [scroll.id]: http(),
  },
})