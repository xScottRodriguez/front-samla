import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'

import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import theme from './theme/index';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store} >
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  </StrictMode>,
)
