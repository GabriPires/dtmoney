import React from 'react';
import ReactDOM from 'react-dom/client';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  models: {
    transaction: Model,
  },
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Desenvolvimento de website',
          amount: 12000,
          category: 'Desenvolvimento',
          type: 'deposit',
          createdAt: new Date('2021-02-20'),
        },
        {
          id: 2,
          title: 'Desenvolvimento de aplicativo',
          amount: 10000,
          category: 'Desenvolvimento',
          type: 'deposit',
          createdAt: new Date('2021-02-20'),
        },
        {
          id: 3,
          title: 'Aluguel',
          amount: 1000,
          category: 'Aluguel',
          type: 'withdraw',
          createdAt: new Date('2021-02-18'),
        },
      ],
    });
  },
  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    });

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data);
    });
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
