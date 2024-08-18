import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginateResponse, Product } from '../models/product.interface';
import { PaginationPayload } from '../models/product-payload';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly baseUrl = 'https://dummyjson.com/products';
  constructor(private http: HttpClient) {}
  getCategoryList(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/category-list`);
  }
  getProductList(
    payload: PaginationPayload
  ): Observable<PaginateResponse<Product[]>> {
    const paramsObj = {
      skip: payload.skip,
      limit: payload.limit,
    };
    const params = new HttpParams({ fromObject: paramsObj });
    return this.http.get<PaginateResponse<Product[]>>(
      `https://dummyjson.com/products`,
      { params }
    );
  }
  getProductListOnSearch(
    searchTerm: string
  ): Observable<PaginateResponse<Product[]>> {
    return this.http.get<PaginateResponse<Product[]>>(
      `https://dummyjson.com/products/search?q=${searchTerm}`
    );
  }
  getProductListOnCategoryChange(
    category: string
  ): Observable<PaginateResponse<Product[]>> {
    return this.http.get<PaginateResponse<Product[]>>(
      `https://dummyjson.com/products/category/${category}`
    );
  }
}
