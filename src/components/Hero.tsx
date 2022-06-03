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
        px={{ base: 4, md: 24, lg: 32 }}
        pt={{ base: '24rem', sm: '26rem', md: '28rem', lg: '23rem' }}
      >
        Electronics
      </Text>
    </Flex>
  );
};

export default Hero;
