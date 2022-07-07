import { Donor, Give, Recipient, Indexable, Platform } from 'src/commons/types';
import { generateSearchTagsFromString } from 'src/commons/utils/StringUtils';
import {
  SEARCHABLE_FIELDS_IN_DONOR,
  SEARCHABLE_FIELDS_IN_GIVE,
  SEARCHABLE_FIELDS_IN_RECIPIENT,
} from 'src/server/constants/search';

export function shouldUpdateSearchTags(
  partialData: Indexable,
  searchableFields: string[]
) {
  return Object.keys(partialData).some((field) =>
    searchableFields.includes(field)
  );
}

function generateSearchTagsFromSearchableFields(
  entity: Indexable,
  searchableFields: string[]
) {
  const searchTags = searchableFields
    .map((searchableField) => {
      const searchableFieldValue = entity[searchableField];

      if (typeof searchableFieldValue === 'string') {
        return generateSearchTagsFromString(searchableFieldValue || '');
      }

      return [];
    })
    .flat();

  const searchTagsWithoutDuplicates = [...new Set(searchTags)];

  if (entity.id) {
    return [...searchTagsWithoutDuplicates, entity.id];
  }

  return searchTagsWithoutDuplicates;
}

export function generateGiveSearchTags(give: Partial<Give>): string[] {
  return generateSearchTagsFromSearchableFields(
    give,
    SEARCHABLE_FIELDS_IN_GIVE
  );
}

export function generateDonorSearchTags(donor: Partial<Donor>): string[] {
  return generateSearchTagsFromSearchableFields(
    donor,
    SEARCHABLE_FIELDS_IN_DONOR
  );
}

export function generateRecipientSearchTags(
  recipient: Partial<Recipient>
): string[] {
  return generateSearchTagsFromSearchableFields(
    recipient,
    SEARCHABLE_FIELDS_IN_RECIPIENT
  );
}

export function generatePlatformSearchTags(
  platform: Partial<Platform>
): string[] {
  return generateSearchTagsFromSearchableFields(
    platform,
    SEARCHABLE_FIELDS_IN_RECIPIENT
  );
}
