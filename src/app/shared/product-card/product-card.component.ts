import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { Product } from '../../core/models/product.interface';
import { DecimalPipe } from '@angular/common';
import { AnimateDirective } from '../../core/directives/animate.directive';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [DecimalPipe, AnimateDirective],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent implements OnInit {
  product = input.required<Product>();
  onAddToCart = output<void>();
  stock = signal<number>(0);
  ngOnInit(): void {
    if (this.product().stock) {
      this.stock.set(this.product().stock);
    }
  }
  addToCart() {
    this.stock.update((value) => {
      return --value;
    });
    this.onAddToCart.emit();
  }
}
