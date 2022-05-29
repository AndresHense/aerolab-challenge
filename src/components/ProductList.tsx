import {
  Button,
  Divider,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Image,
  Select,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ProductDetails from './ProductBox';
import axios from 'axios';
import { Product, User } from '../types';
import { getProducts, getUser } from '../api/api';
import NavButtons from './NavButtons';

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
    <VStack
      w={{ base: '100%', md: '90%', lg: '83%', xl: '70%' }}
      pt={{ base: 8, lg: 12 }}
      px={{ base: 4, lg: 0 }}
      bg='#f9f9f9'
      spacing={6}
      pb={20}
    >
      <HStack
        w='100%'
        justify='space-between'
        py={3}
        align={{ base: 'start', lg: 'center' }}
      >
        <Stack
          spacing={{ base: 1, lg: 6 }}
          direction={{ base: 'column', lg: 'row' }}
          align={{ base: 'start', lg: 'center' }}
        >
          <Text
            fontSize={{ base: 'lg', lg: 'xl' }}
            color='gray.700'
            whiteSpace='nowrap'
          >
            {range.end} of {products.length} products
          </Text>
          <Divider
            h={{ base: '32px', lg: '48px' }}
            display={{ base: 'none', lg: 'inherit' }}
            borderWidth={1}
            orientation='vertical'
          />
          <HStack>
            <Text
              fontSize={{ base: 'lg', lg: 'xl' }}
              color='gray.500'
              whiteSpace='nowrap'
            >
              Sort by:
            </Text>
            <Select
              fontSize='md'
              color='gray.700'
              pt={1}
              display={{ base: 'inherit', lg: 'none' }}
            >
              <option
                onClick={() => {
                  setSortingMethod(SortingType.MostRecent);
                  sortByMostRecent();
                }}
              >
                Most Recent
              </option>
              <option
                onClick={() => {
                  setSortingMethod(SortingType.LowestPrice);
                  sortByLowestPrice();
                }}
              >
                Lowest Price
              </option>
              <option
                onClick={() => {
                  setSortingMethod(SortingType.HighestPrice);
                  sortByHighestPrice();
                }}
              >
                Highest Price
              </option>
            </Select>
          </HStack>
          <HStack display={{ base: 'none', lg: 'inherit' }}>
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
                sortingMethod === SortingType.LowestPrice
                  ? '#00d7f6'
                  : '#ececec'
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
                sortingMethod === SortingType.HighestPrice
                  ? '#00d7f6'
                  : '#ececec'
              }
              color={
                sortingMethod === SortingType.HighestPrice
                  ? 'white'
                  : 'gray.600'
              }
              onClick={() => {
                setSortingMethod(SortingType.HighestPrice);
                sortByHighestPrice();
              }}
            >
              Highest Price
            </Button>
          </HStack>
        </Stack>
        <NavButtons
          range={range}
          setRange={setRange}
          showLeftArrow={showLeftArrow}
          setShowLeftArrow={setShowLeftArrow}
          productsLength={products.length}
        />
      </HStack>
      <Divider borderWidth={1.25} />
      {!loading && (
        <Grid
          templateColumns={{
            base: 'repeat(1,1fr)',
            md: 'repeat(2,1fr)',
            lg: 'repeat(3,1fr)',
            xl: 'repeat(4,1fr)',
          }}
          gap={5}
          pt={10}
        >
          {products.slice(range.start, range.end).map((product) => (
            <GridItem key={product._id}>
              <ProductDetails product={product} user={user} setUser={setUser} />
            </GridItem>
          ))}
        </Grid>
      )}

      <HStack w='100%' justify='space-between' align='start' py={12} pb={0}>
        <Text
          fontSize={{ base: 'lg', lg: 'xl' }}
          color='gray.700'
          whiteSpace='nowrap'
          pt={2}
        >
          16 of {products.length} products
        </Text>
        <NavButtons
          range={range}
          setRange={setRange}
          showLeftArrow={showLeftArrow}
          setShowLeftArrow={setShowLeftArrow}
          productsLength={products.length}
        />
      </HStack>
      <Divider borderWidth={1} />
    </VStack>
  );
};

export default ProductList;
