import { Indexable } from '../types';

export function removeUndefinedEntries(object: Indexable): Indexable {
  const newObject: Indexable = {};

  Object.entries(object).forEach(([key, value]) => {
    if (value !== undefined) {
      newObject[key] = value;
    }
  });

  return newObject;
}

export function getSize(object: Indexable): number {
  return Object.keys(object).length;
}

export function groupObjects<T>(
  objects: T[],
  targetPropertyName: keyof T,
  transformPropertyTargetValue?: (
    propertyTargetValue: any
  ) => string | undefined
): Indexable<T[]> {
  const groupedObjects: Indexable<T[]> = {};

  objects.forEach((object) => {
    let propertyValue = object[targetPropertyName];

    if (transformPropertyTargetValue) {
      propertyValue = (transformPropertyTargetValue(
        propertyValue
      ) as unknown) as T[keyof T];
    }

    if (!propertyValue) {
      return undefined;
    }

    if (typeof propertyValue !== 'string') {
      throw new Error('Non string target property value is not allowed');
    }

    const objectGroup = groupedObjects[propertyValue];

    if (objectGroup) {
      objectGroup.push(object);
    }

    if (!objectGroup) {
      groupedObjects[propertyValue] = [object];
    }
  });

  return groupedObjects;
}
