export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  thumbnail: string;
  images: string[];
};

export type CartItem = Product & {
  quantity: number;
};

export type AuthUser = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
};

export type UserProfile = AuthUser & {
  phone: string;
  address: {
    address: string;
    city?: string;
    state?: string;
    country?: string;
  };
};
