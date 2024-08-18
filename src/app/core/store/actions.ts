import { createAction, props } from '@ngrx/store';
import { PaginateResponse, Product } from '../models/product.interface';
import { PaginationPayload } from '../models/product-payload';

export const loadCategories = createAction('[Category Page] Load Categories');

export const loadCategoriesSuccess = createAction(
  '[Category API] Load Categories Success',
  props<{ categories: string[] }>()
);

export const loadProducts = createAction(
  '[Product Page] Load Product',
  props<PaginationPayload>()
);
export const loadProductsSuccess = createAction(
  '[Product API] Load Products Success',
  props<{ productResponse: PaginateResponse<Product[]> }>()
);
export const loadProductsOnSearch = createAction(
  '[Product Page Search] Load Product',
  props<{ searchTerm: string }>()
);

export const loadProductsOnCategoryChange = createAction(
  '[Product Category] Load Product With Category',
  props<{ category: string }>()
);

export const addItemToCart = createAction(
  '[Item Added]Counter',
  props<{ cartNumber: number }>()
);
