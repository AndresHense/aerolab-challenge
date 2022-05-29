import { Flex, HStack, Icon, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { User } from '../types';

type Props = {
  user: User;
};

const Navbar = ({ user }: Props) => {
  return (
    <Flex
      dir='row'
      justify='space-between'
      w='100%'
      p={4}
      px={10}
      align='center'
    >
      <Image src='assets/aerolab-logo.svg' boxSize={12} />
      <HStack spacing={4} align='center'>
        <Text fontSize='xl' color='gray.600'>
          {user.name}
        </Text>
        <HStack bg='#ececec' borderRadius={20} h={12}>
          <Text fontSize='xl' color='gray.700' pl={3}>
            {user.points}
          </Text>
          <Image src='assets/icons/coin.svg' pr={2} />
        </HStack>
      </HStack>
    </Flex>
  );
};

export default Navbar;
