import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AccountContext } from 'src/client/contexts/AccountContext';

type ComponentProps = {
  children?: React.ReactNode;
};

const queryClient = new QueryClient();

export function ReactQueryWrapper(props: ComponentProps) {
  const { children } = props;

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export function AuthenticatedWrapper(props: ComponentProps) {
  const { children } = props;

  return (
    <AccountContext.Provider value={{ firstName: 'test name' } as any}>
      {children}
    </AccountContext.Provider>
  );
}
