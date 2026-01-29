import { Routes } from '@angular/router';
import { TransactionFormComponent } from './pages/transaction/transaction-form/transaction-form.component';

export const routes: Routes = [
    {path: '', redirectTo: 'transactions', pathMatch: 'full'},
    {path: 'transactions', loadComponent: () => import('./pages/transaction/transaction-list/transaction-list.component').then(m => m.TransactionListComponent)},
    {path: 'transactions/new', component: TransactionFormComponent},
    {path: 'transactions/edit/:id', component: TransactionFormComponent},
];
