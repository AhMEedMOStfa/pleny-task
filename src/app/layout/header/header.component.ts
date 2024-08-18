import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../core/services/login.service';
import { Store } from '@ngrx/store';
import { loadProducts, loadProductsOnSearch } from '../../core/store/actions';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { AnimateDirective } from '../../core/directives/animate.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, AsyncPipe, AnimateDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  router = inject(Router);
  loginService = inject(LoginService);
  store = inject(Store);
  searchLoading$: Observable<boolean> = this.store.select(
    (state) => state.product.searchLoading
  );
  cartNumber$: Observable<number> = this.store.select(
    (state) => state.product.cartNumber
  );
  onSearch(searchTerm: string) {
    if (!searchTerm) {
      this.store.dispatch(loadProducts({ limit: 12, skip: 0 }));
      return;
    }
    this.store.dispatch(loadProductsOnSearch({ searchTerm }));
  }
}
