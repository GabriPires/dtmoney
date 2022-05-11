import { createContext, useEffect, useState } from 'react';
import { api } from './services/api';

interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  type: 'deposit' | 'withdraw';
  createdAt: string;
}

interface TransactionsProviderProps {
  children: React.ReactNode;
}

export const TransactionsContext = createContext<Transaction[]>([]);

export const TransactionsProvider = ({
  children,
}: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api
      .get('transactions')
      .then(({ data }) => setTransactions(data.transactions));
  }, []);

  return (
    <TransactionsContext.Provider value={transactions}>
      {children}
    </TransactionsContext.Provider>
  );
};
