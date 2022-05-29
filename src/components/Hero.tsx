import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

const Hero = () => {
  return (
    <Flex
      bgImage='assets/header-x1.png'
      w='100%'
      bgSize='cover'
      bgPos={{ base: '205%', sm: '80%' }}
      h={{ base: '70vh', lg: '500px' }}
    >
      <Text
        color='white'
        fontSize={{ base: '5xl', lg: '6xl' }}
        fontWeight='bold'
        position='relative'
        top={{ base: '80%', lg: '75%' }}
        px={{ base: 4, md: 24, lg: 32 }}
      >
        Electronics
      </Text>
    </Flex>
  );
};

export default Hero;
