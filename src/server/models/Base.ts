import { Query } from '@google-cloud/datastore';

import { DatastoreOrder } from 'src/commons/constants/order';
import { Indexable } from 'src/commons/types/Indexable.type';
import { FindResponse } from 'src/commons/types/Response.type';
import { removeUndefinedEntries, getSize } from 'src/commons/utils/ObjectUtil';
import config from 'src/server/config/config';
import NotFoundError from 'src/server/errors/NotFoundError';
import datastore from 'src/server/libs/DatastoreClient';
import { getId, getUrlSafe } from 'src/server/utils/DatastoreUtils';

import * as GenericModel from './GenericModel';

type ConfigureModelParams<Entity> = {
  entity: string;
  excludeFromIndexes?: (keyof Entity)[];
  findKeys: (keyof Entity)[];
};

export type FindOpts<Entity> = {
  cursor?: string;
  limit?: number;
  modifyQuery?: (query: Query) => Query;
  order?: DatastoreOrder<keyof Entity>;
  orderPropertyByDefault?: string;
  searchQuery?: string;
  shouldIncludeDeleted?: boolean;
  select?: (keyof Entity | '__key__')[];
};

type EntityBase = {
  id?: string;
};

export default function configureModel<Entity extends EntityBase>(
  configureModelParams: ConfigureModelParams<Entity>
) {
  const { entity, excludeFromIndexes, findKeys } = configureModelParams;

  async function findByIds(ids: string[]): Promise<Entity[]> {
    return GenericModel.batchFindByKeys(ids.map((id) => [entity, Number(id)]));
  }

  async function find(
    filter?: Partial<Entity>,
    opts?: FindOpts<Entity>
  ): Promise<FindResponse<Entity>> {
    const {
      cursor,
      limit,
      modifyQuery,
      order,
      orderPropertyByDefault,
      searchQuery,
      select: selectData,
      shouldIncludeDeleted = false,
    } = opts || {};
    const recordLimit = limit || config.RECORDS_PER_PAGE;
    const trimmedSearchQuery = searchQuery?.trim();
    let select = selectData;

    if (isFilterEmptyAndIsNotFindAll(filter)) {
      return {
        cursor: null,
        results: [],
      };
    }

    const query = datastore.createQuery(entity).limit(recordLimit);

    if (!shouldIncludeDeleted) {
      query.filter('isDeleted', '=', false);
    }

    if (cursor) {
      query.start(cursor);
    }

    if (filter) {
      findKeys.forEach((filterKey) => {
        const filterValue = filter[filterKey];

        if (filterValue !== undefined) {
          query.filter(filterKey as string, '=', filterValue as any);
        }
      });

      select = removeSelectValuesWithEqualityFilter(select, filter);
    }

    if (trimmedSearchQuery) {
      const splittedSearchQuery = trimmedSearchQuery
        .toLowerCase()
        .split(' ')
        .filter(Boolean);

      splittedSearchQuery.forEach((keywordToSearch) => {
        query.filter('searchTags', '=', keywordToSearch);
      });
    }

    if (modifyQuery) {
      modifyQuery(query);
    }

    if (order) {
      query.order(order.property as string, {
        descending: order.isDescending,
      });
    }

    if (shouldOrderPropertyByDefault(query, orderPropertyByDefault)) {
      query.order(orderPropertyByDefault, {
        descending: true,
      });
    }

    if (filter?.id !== undefined) {
      return findById(filter.id);
    }

    if (select) {
      query.select(select as string[]);
    }

    const { results, cursor: nextCursor } = await GenericModel.find<Entity>(
      query
    );

    return {
      results: select
        ? populateRemovedSelectedProperties(results, filter)
        : results,
      cursor: nextCursor,
    };
  }

  function removeSelectValuesWithEqualityFilter(
    select: ('__key__' | keyof Entity)[] | undefined,
    filter: Partial<Entity>
  ) {
    return select?.filter(
      (selectKey) => filter[selectKey as keyof Entity] === undefined
    );
  }

  function shouldOrderPropertyByDefault(
    query: Query,
    orderPropertyByDefault: string | undefined
  ): orderPropertyByDefault is string {
    const isOrderEmpty = query.orders.length === 0;

    return !!orderPropertyByDefault && isOrderEmpty;
  }

  function populateRemovedSelectedProperties(
    entities: Entity[],
    filter?: Partial<Entity>
  ): Entity[] {
    if (!filter) {
      return entities;
    }

    return entities.map((entity: Indexable) => {
      let newEntity = entity;

      Object.entries(filter).forEach(([filterKey, filterValue]) => {
        const shouldAddProperty =
          entity[filterKey] === undefined && filterValue;

        if (shouldAddProperty) {
          newEntity = {
            ...newEntity,
            [filterKey]: filterValue,
          };
        }
      });

      return newEntity;
    }) as Entity[];
  }

  async function findById(id: string) {
    const itemKey = datastore.key([entity, Number(id)]);
    const [itemData] = await datastore.get(itemKey);

    const isItemDeleted = itemData?.isDeleted ?? true;

    if (isItemDeleted) {
      return {
        cursor: null,
        results: [],
      };
    }

    const urlSafeKey = await getUrlSafe(itemKey);

    return {
      cursor: null,
      results: [
        {
          ...itemData,
          urlSafeKey,
          id: id,
        },
      ] as Entity[],
    };
  }

  async function findOne(params: Partial<Entity>): Promise<Entity> {
    const { results } = await find(params, {
      limit: 1,
    });

    const [item] = results;

    return item;
  }

  async function createItem(params: Partial<Entity>): Promise<Entity> {
    const item = ({
      ...params,
      isDeleted: false,
      dateCreated: new Date(),
      dateUpdated: new Date(),
    } as unknown) as Entity;

    const [result] = await GenericModel.create<Entity>({
      excludeFromIndexes: excludeFromIndexes as string[],
      key: entity,
      data: item,
    });

    const itemId = getId(result, entity);

    return {
      ...item,
      id: itemId,
    };
  }

  async function deleteItem(itemId: string): Promise<string> {
    await GenericModel.deleteEntity([entity, Number(itemId)]);

    return itemId;
  }

  async function updateItem(
    params: Partial<Entity> & { id: string }
  ): Promise<Entity> {
    const item = await findOne({ id: params.id } as Partial<Entity>);

    if (!item) {
      throw new NotFoundError(`${entity} not found.`);
    }

    const newEntity = {
      ...item,
      ...removeUndefinedEntries(params),
      dateUpdated: new Date(),
    } as Entity;

    await GenericModel.update<Entity>({
      excludeFromIndexes: excludeFromIndexes as string[],
      data: newEntity,
      key: [entity, Number(params.id)],
    });

    return newEntity;
  }

  async function batchUpsertItems(
    params: Entity[],
    additionalFilters: Indexable = {}
  ): Promise<Entity[]> {
    const items = await Promise.all(
      params.map(async (param: Indexable) => {
        let key = param.id ? [entity, Number(param.id)] : entity;
        let item = await findOne({ id: param.id } as Partial<Entity>);
        let dateUpdated = new Date();

        const { legacyId } = param;

        if (!param.id && legacyId) {
          item = await findOne({
            legacyId,
            ...(additionalFilters as Partial<Entity>),
          });

          dateUpdated = param.dateUpdated;
          key = item?.id ? [entity, Number(item.id)] : entity;
        }

        if (!item) {
          item = ({
            isDeleted: !!param.isDeleted,
            dateCreated: param.dateCreated ? param.dateCreated : new Date(),
          } as unknown) as Entity;
        }

        return {
          key,
          data: {
            ...item,
            ...param,
            dateUpdated,
          } as Entity,
          excludeFromIndexes: excludeFromIndexes as string[],
        };
      })
    );

    await GenericModel.batchUpsert<Entity>(items);

    return items.map((item) => item.data);
  }

  async function softDeleteItem(id: string): Promise<string> {
    await updateItem({
      id,
      isDeleted: true,
    } as any);

    return id;
  }

  function isFilterEmptyAndIsNotFindAll(filter?: Partial<Entity>) {
    const isFindAll = filter === undefined;
    const isFilterEmpty = getSize(removeUndefinedEntries(filter ?? {})) === 0;

    return isFilterEmpty && !isFindAll;
  }

  return {
    batchUpsertItems,
    createItem,
    deleteItem,
    find,
    findByIds,
    findOne,
    softDeleteItem,
    updateItem,
  };
}
