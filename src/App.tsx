import { Flex, VStack } from '@chakra-ui/react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';

function App() {
  return (
    <VStack w='100%' bg='#f9f9f9'>
      <Navbar />
      <Hero />
      <ProductList />
    </VStack>
  );
}

export default App;
