import { Project } from 'src/commons/types/Project.type';

import {
  OmitDefaultProperties,
  RequireField,
} from 'src/commons/utils/TypescriptUtils';

import BadRequestError from '../errors/BadRequestError';
import {
  createProject as createProjectModal,
  updateProject as updateProjectModal,
} from '../models/ProjectModel';

import {
  validateProjectCreate,
  validateProjectUpdate,
} from '../validator/project';

export async function updateProject(
  data: RequireField<Partial<Project>, 'id'>
): Promise<Project> {
  const validationResult = validateProjectUpdate(data);

  if (validationResult.error) {
    throw new BadRequestError(validationResult.error.message);
  }

  return updateProjectModal({
    ...data,
    id: data.id,
  });
}

export async function createProject(project: Project) {
  const validationResult = validateProjectCreate(project);

  if (validationResult.error) {
    throw new BadRequestError(validationResult.error.message);
  }

  const newProject: OmitDefaultProperties<Project> = {
    title: project.title,
  };

  return createProjectModal(newProject);
}
