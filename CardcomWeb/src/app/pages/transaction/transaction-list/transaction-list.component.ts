import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { TransactionService } from '../../../services/transaction.service';
import { CommonModule } from '@angular/common';
import { StatusFilter, Transaction } from '../../../models/transaction.interface';
import { catchError, of } from 'rxjs';
import { RouterModule } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TansactionFilterPipe } from "../../../pipes/tansaction-filter.pipe";
import { SortByDatePipe } from "../../../pipes/sort-by-date.pipe";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type DateSort = 'date_desc' | 'date_asc';
@Component({
  selector: 'app-transaction-list',
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule, TansactionFilterPipe, SortByDatePipe],
  standalone : true,
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})
export class TransactionListComponent implements OnInit {

  transactionsSrv = inject(TransactionService);
  readonly statusCtrl = new FormControl<StatusFilter>('all', { nonNullable: true });
  dateSortCtrl = new FormControl<DateSort>('date_desc', { nonNullable: true });
  transactions$ = this.transactionsSrv.transactions$;
  destroyRef = inject(DestroyRef);

   ngOnInit(): void {
    this.loadTransactions()
  }

loadTransactions() {
  this.transactionsSrv.getTransactions()
  .pipe(
    takeUntilDestroyed(this.destroyRef),
    catchError((err) => {
                  console.error('Error fetching transactions', err);
                  return of([]); }
  )).subscribe();
}

  remove(t: Transaction) {
    this.transactionsSrv.removeTransaction(t.id);
  }

  toggleDateSort() {
  this.dateSortCtrl.setValue(
    this.dateSortCtrl.value === 'date_desc'
      ? 'date_asc'
      : 'date_desc'
  );
}
  trackById = (_: number, t: any) => t.id;
}
