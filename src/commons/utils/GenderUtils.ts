import { GENDERS } from '../constants/genders';

export function getGenderLegacyId(gender: string) {
  return Object.entries(GENDERS).find(
    ([key, value]) => value.name === gender
  )?.[1].legacyId as string;
}
