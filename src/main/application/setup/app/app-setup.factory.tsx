import React from 'react'
import { RoutesSetupFactory, ProviderSetupFactory } from '../../../application/setup'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

export const AppSetupFactory: React.FC = () =>
  <ChakraProvider>
    <BrowserRouter>
      <ProviderSetupFactory>
        <RoutesSetupFactory />
      </ProviderSetupFactory>
    </BrowserRouter>
  </ChakraProvider>
