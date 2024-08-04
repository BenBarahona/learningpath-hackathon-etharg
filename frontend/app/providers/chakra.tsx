// app/providers.tsx
'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../themes/index'

export function Chakra({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}