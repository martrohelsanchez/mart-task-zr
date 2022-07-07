import React from 'react';

import ContextProvider from 'src/client/components/Provider';
import { LoadingPage } from 'src/client/pages';

import { useGetCurrentAccount } from './hooks/queries/accountQueries';
import AuthorizedRoutes from './routes/AuthorizedRoutes';
import UnauthorizedRoutes from './routes/UnauthorizedRoutes';

export default function App() {
  const { data: account, error, isLoading } = useGetCurrentAccount();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error || !account) {
    return (
      <ContextProvider>
        <UnauthorizedRoutes />
      </ContextProvider>
    );
  }

  return (
    <ContextProvider account={account}>
      <AuthorizedRoutes />
    </ContextProvider>
  );
}
