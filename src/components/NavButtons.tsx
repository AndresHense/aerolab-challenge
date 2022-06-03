import { HStack, IconButton, Image } from '@chakra-ui/react';
import React from 'react';

type Props = {
  range: any;
  setRange: Function;
  setShowLeftArrow: Function;
  showLeftArrow: boolean;
  productsLength: number;
};

const NavButtons = ({
  range,
  setRange,
  setShowLeftArrow,
  showLeftArrow,
  productsLength,
}: Props) => {
  return (
    <HStack align='start' justify='start' spacing={5}>
      <IconButton
        icon={<Image src='assets/icons/arrow-left.svg' />}
        display={showLeftArrow ? 'inherit' : 'none'}
        aria-label='search-options-left'
        justifySelf='end'
        variant='unstyled'
        boxSize={{ base: 10, sm: 12 }}
        pt={{ base: 0, lg: 0, xl: 0 }}
        _focus={{ border: 'none' }}
        onClick={() => {
          if (range.start - 16 < 0) return;
          setShowLeftArrow(false);
          setRange({ start: range.start - 16, end: range.end - 16 });
        }}
      />
      <IconButton
        icon={<Image src='assets/icons/arrow-right.svg' />}
        aria-label='search-options'
        justifySelf='end'
        variant='unstyled'
        boxSize={{ base: 10, sm: 12 }}
        _focus={{ border: 'none' }}
        onClick={() => {
          if (range.start + 16 >= productsLength) return;
          setShowLeftArrow(true);
          setRange({ start: range.start + 16, end: range.end + 16 });
        }}
      />
    </HStack>
  );
};

export default NavButtons;
