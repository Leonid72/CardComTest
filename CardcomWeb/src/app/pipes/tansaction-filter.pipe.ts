import { Pipe, PipeTransform } from '@angular/core';
import { Transaction, TransactionStatus } from '../models/transaction.interface';

@Pipe({
  name: 'tansactionFilter'
})
export class TansactionFilterPipe implements PipeTransform {

 transform(
    transactions: Transaction[] | null,
    status: 'all' | TransactionStatus
  ): Transaction[] {
    if (!transactions || status === 'all') return transactions ?? [];
    return transactions.filter(t => t.status === status);
  }

}
