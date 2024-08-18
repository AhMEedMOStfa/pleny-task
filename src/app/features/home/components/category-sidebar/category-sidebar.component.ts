import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import {
  loadCategories,
  loadProducts,
  loadProductsOnCategoryChange,
  loadProductsSuccess,
} from '../../../../core/store/actions';
import { AppState } from '../../../../core/store/reducers';
import { FormsModule } from '@angular/forms';
import { AnimateDirective } from '../../../../core/directives/animate.directive';

@Component({
  selector: 'app-category-sidebar',
  standalone: true,
  imports: [AsyncPipe, FormsModule, AnimateDirective],
  templateUrl: './category-sidebar.component.html',
  styleUrl: './category-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategorySidebarComponent {
  selectedCategory = 'all';
  categories$: Observable<string[]> = this.store.select((state) => [
    'all',
    ...state.product.categories,
  ]);
  isLoading$: Observable<boolean> = this.store.select((state) => {
    return state.product.isLoading;
  });
  constructor(private store: Store<{ product: AppState }>) {
    this.store.dispatch(loadCategories());
  }
  filterByCategory(category: string) {
    if (category == 'all') {
      this.store.dispatch(loadProducts({ limit: 12, skip: 0 }));
      return;
    }
    this.store.dispatch(loadProductsOnCategoryChange({ category }));
  }
}
