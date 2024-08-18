import { createReducer, on } from '@ngrx/store';
import {
  addItemToCart,
  loadCategories,
  loadCategoriesSuccess,
  loadProducts,
  loadProductsOnCategoryChange,
  loadProductsOnSearch,
  loadProductsSuccess,
} from './actions';
import { PaginateResponse, Product } from '../models/product.interface';

export interface AppState {
  categories: string[];
  productResponse: PaginateResponse<Product[]>;
  searchLoading: boolean;
  isLoading: boolean;
  cartNumber: number;
}

export const initialState: AppState = {
  categories: [],
  productResponse: {} as PaginateResponse<Product[]>,
  isLoading: false,
  searchLoading: false,
  cartNumber: 0,
};

export const productReducer = createReducer(
  initialState,
  on(loadCategories, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(loadCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categories,
    isLoading: false,
  })),
  on(loadProducts, (state, { skip, limit }) => ({
    ...state,
    skip,
    limit,
    isLoading: true,
  })),
  on(loadProductsSuccess, (state, { productResponse }) => ({
    ...state,
    productResponse,
    isLoading: false,
    searchLoading: false,
  })),
  on(loadProductsOnSearch, (state) => ({
    ...state,
    searchLoading: true,
  })),
  on(loadProductsOnCategoryChange, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(addItemToCart, (state, { cartNumber }) => ({
    ...state,
    cartNumber: cartNumber++,
  }))
);
