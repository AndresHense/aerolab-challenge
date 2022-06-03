import {
  Button,
  Divider,
  HStack,
  IconButton,
  Image,
  Skeleton,
  SkeletonText,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { redeemProduct } from '../api/api';
import { Product, User } from '../types';

type Props = {
  product: Product;
  user: User;
  setUser: Function;
};

const ProductBox = ({ product, user, setUser }: Props) => {
  const [isHover, setIsHover] = useState(false);
  const [canRedeem, setCanReedem] = useState(product.cost - user.points < 0);
  const [loading, setLoading] = useState(true);

  const handleHover = () => {
    setIsHover(true);
  };

  const handleRedeem = () => {
    redeemProduct(product._id);
    const editedUser = {
      ...user,
      points: user.points - product.cost,
    };
    setUser(editedUser);
  };

  return (
    <VStack
      bg='white'
      boxShadow='5px 1px 12px #ccc'
      borderWidth='1px'
      px={4}
      py={4}
      w='276px'
      h='276px'
      onMouseEnter={handleHover}
      onMouseLeave={() => {
        setIsHover(false);
      }}
    >
      <HStack align='start' w='100%'>
        <Skeleton isLoaded={!loading} p={0} m={0} w='100%'>
          <Image
            src={product.img.url}
            onLoad={() => setLoading(false)}
            maxW='inherit'
          />
        </Skeleton>
        {!canRedeem ? (
          <HStack
            position='relative'
            bg='#7f7f7f'
            opacity='0.8'
            zIndex='2'
            top='0px'
            right='135px'
            pr={9}
            pl={4}
            h={10}
            borderRadius={20}
            align='center'
          >
            <Text whiteSpace='nowrap' color='white' fontSize='xs'>
              You need {product.cost - user.points}
            </Text>
            <Image src='assets/icons/coin.svg' boxSize={6} />
          </HStack>
        ) : (
          <IconButton
            variant='unstyled'
            zIndex={4}
            w={isHover ? 20 : 12}
            icon={
              <Image
                objectFit='cover'
                w={isHover ? 20 : 12}
                src={
                  isHover
                    ? 'assets/icons/buy-white.svg'
                    : 'assets/icons/buy-blue.svg'
                }
              />
            }
            aria-label='redeem'
            position='relative'
            right='45px'
          />
        )}
      </HStack>
      <Divider />
      <VStack w='100%' spacing={0} px={2} align='start' pt={2}>
        <SkeletonText isLoaded={!loading} noOfLines={1} pb={loading ? 3 : 0}>
          <Text fontSize='sm' color='gray.500'>
            {product.category}
          </Text>
        </SkeletonText>
        <SkeletonText isLoaded={!loading} noOfLines={1}>
          <Text>{product.name}</Text>
        </SkeletonText>
      </VStack>
      <VStack
        display={isHover && canRedeem ? 'inherit' : 'none'}
        zIndex={3}
        position='relative'
        bg='rgba(47,216,250,0.6)'
        w='276px'
        py='84px'
        bottom='276px'
      >
        <HStack>
          <Text pt={1} fontSize='4xl' fontWeight='medium' color='white'>
            {product.cost}
          </Text>
          <Image src='assets/icons/coin.svg' boxSize={8} />
        </HStack>
        <Button
          bg='white'
          fontSize='xl'
          fontWeight='normal'
          borderRadius={28}
          w='75%'
          pt={1}
          h={10}
          onClick={handleRedeem}
        >
          Redeem now
        </Button>
      </VStack>
    </VStack>
  );
};

export default ProductBox;
