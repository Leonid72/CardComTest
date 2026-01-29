import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type TransactionStatusUi = 'Pending' | 'Completed' | 'Rejected';

@Component({
  selector: 'app-status-transaction-dd',
  imports: [],
  templateUrl: './status-transaction-dd.component.html',
  styleUrl: './status-transaction-dd.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StatusTransactionDdComponent),
      multi: true
    }
  ]
})
export class StatusTransactionDdComponent implements ControlValueAccessor {
 statuses: TransactionStatusUi[] = ['Pending', 'Completed', 'Rejected'];
  value: TransactionStatusUi | '' = '';

  private onChange = (_: any) => {};
  private onTouched = () => {};

  writeValue(value: TransactionStatusUi): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  select(value: string) {
    this.value = value as TransactionStatusUi;
    this.onChange(this.value);
  }

}
