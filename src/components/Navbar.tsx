import { Flex, HStack, Icon, IconButton, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { addPoints } from '../api/api';
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
      px={{ base: 4, lg: 10 }}
      pb={{ base: 2, lg: 3 }}
      align='center'
    >
      <Image src='assets/aerolab-logo.svg' boxSize={{ base: 9, lg: 10 }} />
      <HStack spacing={4} align='center'>
        <Text fontSize={{ base: 'lg', lg: 'xl' }} color='gray.600'>
          {user.name}
        </Text>
        <HStack bg='#ececec' borderRadius={20} h={{ base: 10, lg: 12 }}>
          <Text fontSize={{ base: 'lg', lg: 'xl' }} color='gray.700' pl={3}>
            {user.points}
          </Text>
          <IconButton
            variant='unstyled'
            _focus={{ border: 'none' }}
            onClick={() => {
              addPoints();
            }}
            icon={<Image src='assets/icons/coin.svg' />}
            pr={2}
            boxSize={{ base: 9, lg: 10 }}
            aria-label='add coins'
          />
        </HStack>
      </HStack>
    </Flex>
  );
};

export default Navbar;
