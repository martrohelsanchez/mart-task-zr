import Joi, { AnySchema } from 'joi';

import { Project } from 'src/commons/types/Project.type';

type ProjectSchema = {
  [Property in keyof Project]?: AnySchema;
};

const projectBaseSchema: ProjectSchema = {
  title: Joi.string(),
};

export function validateProjectCreate(project: Partial<Project>) {
  const projectCreateSchema = Joi.object<Project>({
    ...projectBaseSchema,
    title: projectBaseSchema.title?.required(),
  });

  return projectCreateSchema.validate(project);
}

export function validateProjectUpdate(project: Partial<Project>) {
  const projectSaveSchema = Joi.object<Project>(projectBaseSchema);

  return projectSaveSchema.validate(project);
}
