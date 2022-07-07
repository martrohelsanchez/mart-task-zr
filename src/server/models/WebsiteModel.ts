import { Website } from 'src/commons/types/Website.type';

import { Entity } from '../../commons/constants/entities';

import configureModel from './Base';

const {
  findOne: findWebsite,
  batchUpsertItems: batchUpsertWebsite,
  createItem: createWebsite,
  find: findWebsites,
  findByIds: findWebsiteByIds,
  softDeleteItem: deleteWebsite,
  updateItem: updateWebsite,
} = configureModel<Website>({
  entity: Entity.WEBSITE,
  findKeys: ['projectId'],
});

export {
  findWebsite,
  batchUpsertWebsite,
  createWebsite,
  findWebsites,
  findWebsiteByIds,
  deleteWebsite,
  updateWebsite,
};
