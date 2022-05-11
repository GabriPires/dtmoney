import { createContext, useEffect, useState } from 'react';
import { api } from './services/api';

interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  type: string;
  createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsProviderProps {
  children: React.ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction(transaction: TransactionInput): void;
}

export const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData,
);

export const TransactionsProvider = ({
  children,
}: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api
      .get('transactions')
      .then(({ data }) => setTransactions(data.transactions));
  }, []);

  const createTransaction = async (transaction: TransactionInput) => {
    api.post('transactions', transaction);
  };

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
};