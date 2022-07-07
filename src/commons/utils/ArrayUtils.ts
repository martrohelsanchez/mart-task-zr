export async function asyncForEach<T>(
  iteratee: T[],
  callbackFn: (value: T, index: number, array: T[]) => Promise<void>
): Promise<void> {
  const promises = iteratee.map(async (...callbackFnParams) => {
    await callbackFn(...callbackFnParams);
  });

  await Promise.all(promises);
}

export async function asyncMap<T, CbReturn>(
  iteratee: T[],
  callbackFn: (value: T, index: number, array: T[]) => Promise<CbReturn>
): Promise<CbReturn[]> {
  const promises = iteratee.map(async (...callbackFnParams) =>
    callbackFn(...callbackFnParams)
  );

  return Promise.all(promises);
}

export function removeItemFromArray<T>(
  array: T[] | undefined,
  item: T
): T[] | undefined {
  if (!array) {
    return array;
  }

  const index = array.indexOf(item);
  const newArray = [...array];

  if (index !== -1) {
    newArray.splice(index, 1);
  }

  return newArray;
}

export function sortArrayByAscending<T = number[] | Date[] | string[]>(
  array: T[],
  dataType: 'number' | 'date' | 'string' = 'number'
): T[] {
  switch (dataType) {
    case 'number':
    case 'date':
      return [...array].sort((a: any, b: any) => a - b);
    case 'string':
      return [...array].sort();
  }
}

export function sortArrayByDescending(
  array: number[],
  dataType: 'number' | 'date' | 'string' = 'number'
) {
  switch (dataType) {
    case 'number':
    case 'date':
      return [...array].sort((a, b) => b - a);
    case 'string':
      return [...array].sort().reverse();
  }
}

export function sortObjectsByDescending<T>(
  objects: T[],
  propertyName: keyof T
) {
  return [...objects].sort(
    (a, b) =>
      ((b[propertyName] as unknown) as number) -
      ((a[propertyName] as unknown) as number)
  );
}
