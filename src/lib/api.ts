import axios from "axios";
import { AuthUser, Product, UserProfile } from "@/lib/types";

const api = axios.create({
  baseURL: "https://dummyjson.com",
});

type ProductListResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

type CategoryResponse = string[];

export async function getProducts(params: {
  limit: number;
  skip: number;
  search?: string;
  category?: string;
}): Promise<ProductListResponse> {
  const { limit, skip, search, category } = params;

  if (category && category !== "all") {
    const response = await api.get<{ products: Product[] }>(
      `/products/category/${category}`,
    );
    const filtered = search
      ? response.data.products.filter((product) =>
          product.title.toLowerCase().includes(search.toLowerCase()),
        )
      : response.data.products;
    const paginated = filtered.slice(skip, skip + limit);

    return {
      products: paginated,
      total: filtered.length,
      skip,
      limit,
    };
  }

  if (search) {
    const response = await api.get<ProductListResponse>("/products/search", {
      params: { q: search, limit, skip },
    });
    return response.data;
  }

  const response = await api.get<ProductListResponse>("/products", {
    params: { limit, skip },
  });
  return response.data;
}

export async function getProductById(id: number): Promise<Product> {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
}

export async function getCategories(): Promise<string[]> {
  const response = await api.get<CategoryResponse>("/products/category-list");
  return response.data;
}

type LoginResponse = AuthUser & {
  accessToken: string;
  refreshToken: string;
};

export async function loginWithDummyAuth(params: {
  username: string;
  password: string;
  expiresInMins?: number;
}): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>(
    "/auth/login",
    {
      username: params.username,
      password: params.password,
      expiresInMins: params.expiresInMins ?? 60,
    },
    {
      headers: { "Content-Type": "application/json" },
    },
  );

  return response.data;
}

export async function getAuthMe(accessToken: string): Promise<AuthUser> {
  const response = await api.get<AuthUser>("/auth/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
}

export async function getUserById(userId: number): Promise<UserProfile> {
  const response = await api.get<UserProfile>(`/users/${userId}`);
  return response.data;
}

export async function updateUserById(
  userId: number,
  payload: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
  },
): Promise<UserProfile> {
  const response = await api.patch<UserProfile>(
    `/users/${userId}`,
    {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phone: payload.phone,
      address: {
        address: payload.address,
      },
    },
    {
      headers: { "Content-Type": "application/json" },
    },
  );

  return response.data;
}
