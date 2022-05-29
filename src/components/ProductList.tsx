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

const emptyProducts: Product[] = [];
emptyProducts.fill(
  {
    _id: '',
    name: '',
    category: '',
    cost: -1,
    img: { url: '', hdUrl: '' },
  },
  16
);

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
  const [products, setProducts] = useState<Product[]>(emptyProducts);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState({ start: 0, end: 16 });
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [sortingMethod, setSortingMethod] = useState<SortingType>(
    SortingType.MostRecent
  );

  const sortByHighestPrice = () => {
    setProducts(products.sort((a, b) => b.cost - a.cost));
  };
  const sortByLowestPrice = () => {
    setProducts(products.sort((a, b) => a.cost - b.cost));
  };

  const sortByMostRecent = () => {
    getProducts(setProducts);
  };
  useEffect(() => {
    if (sortingMethod === SortingType.MostRecent) {
      sortByMostRecent();
    } else if (sortingMethod === SortingType.HighestPrice) {
      sortByHighestPrice();
    } else if (sortingMethod === SortingType.LowestPrice) {
      sortByLowestPrice();
    }
    setLoading(false);
  }, []);

  return (
    <VStack w='63%' pt={12} bg='#f9f9f9' spacing={6} pb={20}>
      <HStack w='100%' justify='space-between' py={3}>
        <HStack spacing={6}>
          <Text fontSize='xl' color='gray.700'>
            {range.end} of {products.length} products
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
            onClick={() => {
              setSortingMethod(SortingType.MostRecent);
              sortByMostRecent();
            }}
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
            onClick={() => {
              setSortingMethod(SortingType.LowestPrice);
              sortByLowestPrice();
            }}
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
            onClick={() => {
              setSortingMethod(SortingType.HighestPrice);
              sortByHighestPrice();
            }}
          >
            Highest Price
          </Button>
        </HStack>
        <HStack align='center' justify='center' spacing={5}>
          <IconButton
            icon={<Image src='assets/icons/arrow-left.svg' />}
            display={showLeftArrow ? 'inherit' : 'none'}
            aria-label='search-options-left'
            justifySelf='end'
            variant='unstyled'
            pt={2}
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
            _focus={{ border: 'none' }}
            onClick={() => {
              if (range.start + 16 >= products.length) return;
              setShowLeftArrow(true);
              setRange({ start: range.start + 16, end: range.end + 16 });
            }}
          />
        </HStack>
      </HStack>
      <Divider borderWidth={1.25} />
      {!loading && (
        <Grid
          templateColumns='repeat(4,1fr)'
          gap={5}
          templateRows='repeat(4,1fr)'
          pt={10}
        >
          {products.slice(range.start, range.end).map((product) => (
            <GridItem key={product._id}>
              <ProductDetails product={product} user={user} setUser={setUser} />
            </GridItem>
          ))}
        </Grid>
      )}

      <HStack w='100%' justify='space-between' py={12} pb={0}>
        <Text fontSize='xl' color='gray.700'>
          16 of {products.length} products
        </Text>
        <HStack align='center' justify='center' spacing={5}>
          <IconButton
            icon={<Image src='assets/icons/arrow-left.svg' />}
            display={showLeftArrow ? 'inherit' : 'none'}
            aria-label='search-options-left'
            justifySelf='end'
            variant='unstyled'
            pt={2}
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
            _focus={{ border: 'none' }}
            onClick={() => {
              if (range.start + 16 >= products.length) return;
              setShowLeftArrow(true);
              setRange({ start: range.start + 16, end: range.end + 16 });
            }}
          />
        </HStack>
      </HStack>
      <Divider borderWidth={1} />
    </VStack>
  );
};

export default ProductList;
