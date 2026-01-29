import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from '../models/transaction.interface';
type DateSort = 'date_desc' | 'date_asc';
@Pipe({
  name: 'sortByDate'
})
export class SortByDatePipe implements PipeTransform {
transform(
    transactions: Transaction[] | null,
    sort: DateSort = 'date_desc'
  ): Transaction[] {

    if (!transactions || transactions.length === 0) return [];

    const copy = [...transactions]; 

    copy.sort((a, b) => {
      const aTime = new Date(a.createdDate as any).getTime();
      const bTime = new Date(b.createdDate as any).getTime();

      return sort === 'date_asc'
        ? aTime - bTime
        : bTime - aTime;
    });

    return copy;
  }
}
