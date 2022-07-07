export function cleanResponse<T>(data: Partial<T>): T {
  if (!data || typeof data !== 'object') {
    return data;
  }

  return ({
    ...data,
    encryptedPassword: undefined,
    keywords: undefined,
    password: undefined,
  } as unknown) as T;
}
