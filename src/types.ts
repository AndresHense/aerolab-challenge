type Img = {
  url: string;
  hdUrl: string;
};

type Product = {
  _id: string;
  name: string;
  cost: number;
  category: string;
  img: Img;
};

type User = {
  id: string;
  name: string;
  points: number;
  redeemHistory: string[];
  createDate: string;
};

export type { Img, Product, User };
