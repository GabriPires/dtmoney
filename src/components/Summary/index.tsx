import { useContext } from 'react';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { TransactionsContext } from '../../TransactionContext';

import { Container } from './styles';

export const Summary = () => {
  const { transactions } = useContext(TransactionsContext);

  const summary = transactions.reduce(
    (total, transaction) => {
      if (transaction.type === 'deposit') {
        total.deposits += transaction.amount;
        total.total += transaction.amount;
      } else {
        total.withdraws += transaction.amount;
        total.total -= transaction.amount;
      }

      return total;
    },
    { deposits: 0, withdraws: 0, total: 0 },
  );

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt={'Entradas'} />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(summary.deposits)}
        </strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt={'Saídas'} />
        </header>
        <strong>
          -{' '}
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(summary.withdraws)}
        </strong>
      </div>

      <div className={'highlight-background'}>
        <header>
          <p>Total</p>
          <img src={totalImg} alt={'Total'} />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(summary.total)}
        </strong>
      </div>
    </Container>
  );
};
