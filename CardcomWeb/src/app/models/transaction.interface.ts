export interface Transaction {
  id: string;
  customerName: string;
  amount: number;
  createdDate: Date;
  status: TransactionStatus;
}

export interface CreateTransactionRequest {
  customerName: string;
  amount: number;
  status?: Transaction['status'];
}

export interface UpdateTransactionRequest {
  customerName?: string;
  amount?: number;
  status?: Transaction['status'];
}
export type TransactionStatus = 'pending' | 'completed' | 'rejected';
export type StatusFilter = 'all' | TransactionStatus;
