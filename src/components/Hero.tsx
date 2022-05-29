import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

const Hero = () => {
  return (
    <Flex
      bgImage='assets/header-x1.png'
      w='100%'
      backgroundSize='cover'
      h='500px'
    >
      <Text color='white' fontSize='6xl' fontWeight='bold' pl={48} pt='20%'>
        Electronics
      </Text>
    </Flex>
  );
};

export default Hero;
