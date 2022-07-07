import { Query } from '@google-cloud/datastore';
import { entity } from '@google-cloud/datastore/build/src/entity';
import get from 'lodash.get';

import datastore from 'src/server/libs/DatastoreClient';

export function getId(result: any, entityName: string) {
  return get(result, 'mutationResults[0].key.path[0].id', null) || null;
}

export function getUrlSafe(key: entity.Key) {
  return new Promise((resolve, reject) => {
    datastore.keyToLegacyUrlSafe(key, (err, urlSafeKey) => {
      if (err) {
        reject(err);
      }

      resolve(urlSafeKey);
    });
  });
}

export function queryAllAndKeysOnly(query: Query) {
  return query.select('__key__').limit(-1);
}
