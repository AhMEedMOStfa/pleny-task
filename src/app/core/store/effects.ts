import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadCategories,
  loadCategoriesSuccess,
  loadProducts,
  loadProductsOnCategoryChange,
  loadProductsOnSearch,
  loadProductsSuccess,
} from './actions';
import {
  mergeMap,
  map,
  switchMap,
  debounce,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators';
import { ProductService } from '../services/products.service';

@Injectable()
export class ProductEffect {
  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCategories),
      mergeMap(() =>
        this.productService
          .getCategoryList()
          .pipe(map((categories) => loadCategoriesSuccess({ categories })))
      )
    )
  );
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      mergeMap((action) =>
        this.productService
          .getProductList(action)
          .pipe(
            map((productResponse) => loadProductsSuccess({ productResponse }))
          )
      )
    )
  );
  loadProductsOnSearch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProductsOnSearch),
      distinctUntilChanged(),
      debounceTime(700),
      switchMap((action) =>
        this.productService
          .getProductListOnSearch(action.searchTerm)
          .pipe(
            map((productResponse) => loadProductsSuccess({ productResponse }))
          )
      )
    )
  );
  loadProductsOnCategoryChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProductsOnCategoryChange),
      switchMap((action) =>
        this.productService
          .getProductListOnCategoryChange(action.category)
          .pipe(
            map((productResponse) => loadProductsSuccess({ productResponse }))
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
}
