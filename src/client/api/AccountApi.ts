import { Account } from 'src/commons/types';

import ApiClient from './ApiClient';

const apiVersion = '1.0';
const endpoint = 'accounts';
const url = `${apiVersion}/${endpoint}`;

type SwitchDonorPrimaryEmailParams = {
  isNewPrimaryEmailAnAlternate: boolean;
  switchPrimaryEmailTo?: string;
};

export async function getCurrentAccount() {
  const { data } = await ApiClient.get<Account>(`${url}/me`);

  return data;
}

export async function switchPrimaryEmail(
  params: SwitchDonorPrimaryEmailParams
) {
  const { data } = await ApiClient.patch<{ message: string }>(
    `${url}/me/primary-email`,
    params
  );

  return data;
}

export async function updateCurrentAccount(params: Partial<Account>) {
  const { data } = await ApiClient.put<Account>(`${url}/me`, params);

  return data;
}
