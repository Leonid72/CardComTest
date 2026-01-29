import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Transaction, TransactionStatus } from '../models/transaction.interface';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  

  http = inject(HttpClient);
  env =  environment
  private readonly url = `${this.env.assetsBaseUrl}/transactions.json`;
  
  private readonly _transactions$ = new BehaviorSubject<Transaction[]>([]);
  readonly transactions$ = this._transactions$.asObservable();

  getTransactions() {
    if (this._transactions$.value.length > 0) {
    return of(this._transactions$.value);
  }
    return this.http.get<Transaction[]>(this.url).pipe(
      tap(transactions => this._transactions$.next(transactions))
    );
  }

  removeTransaction(id: string): void {
    const updated = this._transactions$.value.filter(t => t.id !== id);
    this._transactions$.next(updated);
  }


  addTransaction(transaction: Transaction): Observable<Transaction> {
    console.log('Adding transaction', transaction);
    this._transactions$.next([
      ...this._transactions$.value,
      transaction
    ]);

    return of(transaction);
  }

updateTransaction(id: string, dto: Transaction) {
  const updated = this._transactions$.value.map(t =>
    t.id === id ? { ...t, ...dto, id } : t
  );

  this._transactions$.next(updated);

  return of(dto);
}
getTransactionById(id: string) {
    return this.transactions$.pipe(
      map(list => list.find(t => t.id === id))
    );
  }
}
