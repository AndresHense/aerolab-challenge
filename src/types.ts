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

export type { Img, Product };
