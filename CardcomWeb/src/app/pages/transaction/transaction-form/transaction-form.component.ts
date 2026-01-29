import { Component, DestroyRef,inject, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Transaction, TransactionStatus } from '../../../models/transaction.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../../services/transaction.service';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-transaction-form',
  imports: [ReactiveFormsModule],
  standalone : true,
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css'
})
export class TransactionFormComponent implements OnInit{


transactionSrv = inject(TransactionService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  isSubmitting = signal(false);
  destroyRef = inject(DestroyRef);
  isEditMode = signal(false);
  transactionId = this.route.snapshot.paramMap.get('id');
  

ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.isEditMode.set(true);   
      this.transactionId = id;
      this.loadTransactionData(this.transactionId);
    }
  }

  fb = inject(FormBuilder);

transactionForm = this.fb.group({
  customerName: this.fb.control('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)]
  }),

  amount: this.fb.control<number | null>(null, {
    validators: [Validators.required, Validators.min(0.1)]
  }),

  createdDate: this.fb.control(new Date(), {
    nonNullable: true
  }),

  status: this.fb.control<TransactionStatus>('pending', {
    nonNullable: true,
    validators: Validators.required
  }),
});


private loadTransactionData(id: string) {
    this.transactionSrv.getTransactionById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (transaction) => {
          if (transaction) {
            this.transactionForm.patchValue(transaction);
          }
        },
        error: () => console.error('Could not load transaction details')
      });
  }

onSubmit() {
  console.log('Submitting form', this.transactionForm.value);
  if (this.transactionForm.invalid) {
    this.transactionForm.markAllAsTouched();
    return;
  }
    this.isSubmitting.set(true);
    const dto = {
      id: crypto.randomUUID(),
      customerName: this.transactionForm.value.customerName!,
      amount: this.transactionForm.value.amount!,
      createdDate: this.transactionForm.value.createdDate!,
      status: this.transactionForm.value.status!
    };
    console.log('Form DTO', dto);
    let req$;
    try {
      req$ = this.isEditMode()
      ? this.transactionSrv.updateTransaction(this.transactionId!, {...dto, id: this.transactionId!})
      : this.transactionSrv.addTransaction(dto);
    }
    catch(error)  {
       this.isSubmitting.set(false);
      console.log('An unexpected error occurred');
      return;
    }

     req$
      .pipe(
        finalize(() => this.isSubmitting.set(false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (res: Transaction) => {
            const action = this.isEditMode() ? 'updated' : 'added';
            console.log(`Transactions ${action} successfully`, res);
            this.router.navigate(['/transactions']);
        }
        ,error: (err: any) => {
            const action = this.isEditMode() ? 'updating' : 'adding';
            console.error(`Error ${action} transaction`, err);
      }

    });
}

}
