import {
  Button,
  Divider,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ProductDetails from './ProductBox';
import axios from 'axios';
import { Product, User } from '../types';
import { getProducts, getUser } from '../api/api';

const productss = [
  {
    _id: '1',
    name: 'yamaha',
    category: 'trash',
    cost: 200,
    img: { url: '', hdUrl: '' },
  },
];

enum SortingType {
  MostRecent,
  LowestPrice,
  HighestPrice,
}

type Props = {
  user: User;
  setUser: Function;
};

const ProductList = ({ user, setUser }: Props) => {
  const [products, setProducts] = useState<Product[]>(productss);
  const [loading, setLoading] = useState(true);
  const [sortingMethod, setSortingMethod] = useState<SortingType>(
    SortingType.MostRecent
  );

  useEffect(() => {
    getProducts(setProducts);
    setLoading(false);
  }, []);

  return (
    <VStack w='63%' pt={12} bg='#f9f9f9' spacing={6} pb={20}>
      <HStack w='100%' justify='space-between' py={3}>
        <HStack spacing={6}>
          <Text fontSize='xl' color='gray.700'>
            16 of 32 products
          </Text>
          <Divider h='48px' borderWidth={1} orientation='vertical' />
          <Text fontSize='xl' color='gray.500'>
            Sort by:
          </Text>
          <Button
            borderRadius={20}
            h={12}
            px={6}
            fontSize='xl'
            fontWeight='normal'
            bg={
              sortingMethod === SortingType.MostRecent ? '#00d7f6' : '#ececec'
            }
            color={
              sortingMethod === SortingType.MostRecent ? 'white' : 'gray.600'
            }
            onClick={() => setSortingMethod(SortingType.MostRecent)}
          >
            Most recent
          </Button>
          <Button
            borderRadius={20}
            h={12}
            px={6}
            fontSize='xl'
            fontWeight='normal'
            bg={
              sortingMethod === SortingType.LowestPrice ? '#00d7f6' : '#ececec'
            }
            color={
              sortingMethod === SortingType.LowestPrice ? 'white' : 'gray.600'
            }
            onClick={() => setSortingMethod(SortingType.LowestPrice)}
          >
            Lowest Price
          </Button>
          <Button
            borderRadius={20}
            h={12}
            px={6}
            fontSize='xl'
            fontWeight='normal'
            bg={
              sortingMethod === SortingType.HighestPrice ? '#00d7f6' : '#ececec'
            }
            color={
              sortingMethod === SortingType.HighestPrice ? 'white' : 'gray.600'
            }
            onClick={() => setSortingMethod(SortingType.HighestPrice)}
          >
            Highest Price
          </Button>
        </HStack>
        <IconButton
          icon={<Image src='assets/icons/arrow-right.svg' />}
          aria-label='search-options'
          justifySelf='end'
          variant='unstyled'
        />
      </HStack>
      <Divider borderWidth={1.25} />
      {!loading && (
        <Grid
          templateColumns='repeat(4,1fr)'
          gap={5}
          templateRows='repeat(4,1fr)'
          pt={10}
        >
          {products.slice(0, 16).map((product) => (
            <GridItem key={product._id}>
              <ProductDetails product={product} user={user} setUser={setUser} />
            </GridItem>
          ))}
        </Grid>
      )}

      <HStack w='100%' justify='space-between' py={12} pb={0}>
        <Text fontSize='xl' color='gray.700'>
          16 of 32 products
        </Text>
        <IconButton
          aria-label='bottom-next-products'
          icon={<Image src='assets/icons/arrow-right.svg' />}
          justifySelf='end'
          variant='unstyled'
        />
      </HStack>
      <Divider borderWidth={1} />
    </VStack>
  );
};

export default ProductList;
