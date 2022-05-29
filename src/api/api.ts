import axios from 'axios';

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjkyYTY4NDhhMTA1NTAwMWE0NmQwMzEiLCJpYXQiOjE2NTM3NzgwNTJ9.r3Nz5Uz7kIcqYLhVSEMrlHfL8BWdsX7qyH7BqzES6Qc`;

const getProducts = async (callback: Function) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      'https://coding-challenge-api.aerolab.co/products',
      config
    );
    console.log(data);
    callback(data);
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (callback: Function) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      'https://coding-challenge-api.aerolab.co/user/me',
      config
    );
    console.log(data);
    callback(data);
  } catch (error) {
    console.log(error);
  }
};

const redeemProduct = async (productId: string) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(productId);
    const { data } = await axios.post(
      'https://coding-challenge-api.aerolab.co/redeem',
      { productId: productId },
      config
    );
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export { getProducts, getUser, redeemProduct };
