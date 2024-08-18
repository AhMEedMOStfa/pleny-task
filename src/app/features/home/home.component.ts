import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { CategorySidebarComponent } from './components/category-sidebar/category-sidebar.component';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { PaginateResponse, Product } from '../../core/models/product.interface';
import { PaginatorComponent } from '../../shared/paginator/paginator.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/store/reducers';
import { Observable } from 'rxjs';
import { addItemToCart, loadProducts } from '../../core/store/actions';
import { AsyncPipe } from '@angular/common';
import { PaginationPayload } from '../../core/models/product-payload';
import { AnimateDirective } from '../../core/directives/animate.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CategorySidebarComponent,
    ProductCardComponent,
    PaginatorComponent,
    AsyncPipe,
    AnimateDirective,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex-1 p-8 flex flex-col gap-2',
  },
})
export class HomeComponent implements OnInit {
  payload: PaginationPayload = {
    skip: 0,
    limit: 12,
  };
  counter = 0;
  totalPage = signal<number>(0);
  products$: Observable<Product[]> = this.store.select((state) => {
    this.totalPage.set(state.product.productResponse.total);
    return state.product.productResponse.products;
  });
  isLoading$: Observable<boolean> = this.store.select((state) => {
    return state.product.isLoading;
  });
  constructor(private store: Store<{ product: AppState }>) {
    this.store.dispatch(loadProducts(this.payload));
  }
  ngOnInit(): void {
    console.log(this.totalPage());
  }
  onPageChange(pageNo: number) {
    const skip = (pageNo - 1) * this.payload.limit;
    this.store.dispatch(loadProducts({ limit: 12, skip: skip }));
  }
  addToCart() {
    this.counter++;
    this.store.dispatch(addItemToCart({ cartNumber: this.counter }));
  }
}
