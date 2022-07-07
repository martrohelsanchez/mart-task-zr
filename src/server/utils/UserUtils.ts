import { Admin } from '../../commons/types/Admin.type';

import { cleanResponse } from './ResponseUtils';

export function formatAdmin(user: Admin): Admin {
  return cleanResponse<Admin>({
    ...user,
    id: user.id,
    email: user.email,
    password: undefined,
  });
}

export function cleanAdminData(user: Partial<Admin>): Admin {
  if (!user) {
    return {} as Admin;
  }

  const userData = {
    ...user,
  };

  return {
    ...userData,
    email: userData.email?.trim(),
    firstName: userData.firstName?.trim(),
    lastName: userData.lastName?.trim(),
    name: userData.name?.trim(),
    username: userData.username?.trim(),
  } as Admin;
}
