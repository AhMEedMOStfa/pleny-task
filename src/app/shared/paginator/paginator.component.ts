import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [NgClass],
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent {
  @Input() total: number = 0; // Total number of records (e.g., products)
  @Input() recordsPerPage: number = 12; // Number of records per page
  @Input() currentPage: number = 1;
  @Output() onPageChange = new EventEmitter<number>();

  get totalPages(): number {
    if (this.total) {
      return Math.ceil(this.total / this.recordsPerPage);
    }
    return 0;
  }

  get pages(): number[] {
    let pages: number[] = [];
    if (this.totalPages) {
      for (let i = 1; i <= this.totalPages; i++) {
        if (
          i <= 2 ||
          i > this.totalPages - 2 ||
          Math.abs(i - this.currentPage) <= 1
        ) {
          pages.push(i);
        }
      }
    }
    return pages;
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.onPageChange.emit(this.currentPage);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.onPageChange.emit(this.currentPage);
    }
  }

  goToPage(page: number) {
    if (page !== this.currentPage) {
      this.currentPage = page;
      this.onPageChange.emit(this.currentPage);
    }
  }
}
