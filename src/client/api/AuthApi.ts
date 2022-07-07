import { UserRole } from 'src/commons/constants/roles';
import { Admin } from 'src/commons/types/Admin.type';

import ApiClient from './ApiClient';

type RegisterParams = {
  email: string;
  name: string;
  password: string;
  username: string;
};

export type LoginParams = {
  email: string;
  password: string;
  userRole: UserRole;
};

const apiVersion = '1.0';
const endpoint = 'auth';
const url = `${apiVersion}/${endpoint}`;

export async function login(params: LoginParams): Promise<Admin> {
  const { data } = await ApiClient.post<Admin>(`${url}/login`, params);

  return data;
}

export async function logout(): Promise<Admin> {
  const { data } = await ApiClient.post<Admin>(`${url}/logout`);

  return data;
}

export async function register(params: RegisterParams): Promise<Admin> {
  const { data } = await ApiClient.post<Admin>(`${url}/register`, params);

  return data;
}
