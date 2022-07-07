import React from 'react';

import { AccountContext as AccountContextType } from 'src/commons/types/Account.type';

export const AccountContext = React.createContext<AccountContextType | null>(
  null
);
