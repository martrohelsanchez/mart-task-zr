import { Ability } from '@casl/ability';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from 'src/client/App.styles';
import { AbilityContext } from 'src/client/contexts/AbilityContext';
import { AccountContext } from 'src/client/contexts/AccountContext';
import defaultTheme from 'src/client/themes/default';
import { UserRole } from 'src/commons/constants/roles';
import { Account } from 'src/commons/types';

type Props = {
  children: React.ReactNode | React.ReactNodeArray;
  account?: Account;
};

export default function ContextProvider(props: Props) {
  const { children, account } = props;
  const { abilities: userAbilities } = (account as any) || { abilities: [] };

  const abilities = new Ability(userAbilities);

  function getAccountContext() {
    if (account) {
      return {
        ...account,
        isRoleAdmin: account.role === UserRole.ADMIN,
        isRoleDonor: account.role === UserRole.DONOR,
        isRoleRecipient: account.role === UserRole.RECIPIENT,
      };
    }

    return null;
  }

  return (
    <AccountContext.Provider value={getAccountContext()}>
      <AbilityContext.Provider value={abilities}>
        <ThemeProvider theme={defaultTheme}>
          <GlobalStyle />
          {children}
        </ThemeProvider>
      </AbilityContext.Provider>
    </AccountContext.Provider>
  );
}
