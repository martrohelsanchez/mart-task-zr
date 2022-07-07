import { Project } from 'src/commons/types/Project.type';
import { Entity } from '../../commons/constants/entities';

import configureModel from './Base';

const {
  findOne: findProject,
  batchUpsertItems: batchUpsertProject,
  createItem: createProject,
  find: findProjects,
  findByIds: findProjectByIds,
  softDeleteItem: deleteProject,
  updateItem: updateProject,
} = configureModel<Project>({
  entity: Entity.PROJECT,
  findKeys: ['title'],
});

export {
  findProject,
  batchUpsertProject,
  createProject,
  findProjects,
  findProjectByIds,
  deleteProject,
  updateProject
};
