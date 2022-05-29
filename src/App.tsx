import { Center, Flex, Spinner, Text, VStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { getUser } from './api/api';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import { User } from './types';

function App() {
  const [user, setUser] = useState<User>({
    id: '',
    name: '',
    points: 0,
    redeemHistory: ['', ''],
    createDate: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser(setUser);
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Center w='100%' h='100vh'>
          <Spinner size='xl' />
        </Center>
      ) : (
        <VStack w='100%' bg='#f9f9f9'>
          <Navbar user={user} />
          <Hero />
          <ProductList user={user} setUser={setUser} />
        </VStack>
      )}
    </>
  );
}

export default App;
