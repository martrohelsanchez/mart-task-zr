import Joi, { AnySchema } from 'joi';

import { Website } from 'src/commons/types/Website.type';

type WebsiteSchema = {
  [Property in keyof Website]?: AnySchema;
};

const scanBaseSchema = {
  image: Joi.string(),
};

const websiteBaseSchema: WebsiteSchema = {
  baselineScan: Joi.object(scanBaseSchema),
  currentScan: Joi.object(scanBaseSchema),
  projectId: Joi.string(),
  url: Joi.string(),
};

export function validateWebsiteCreate(website: Partial<Website>) {
  const websiteCreateSchema = Joi.object<Website>({
    ...websiteBaseSchema,
    projectId: websiteBaseSchema.projectId?.required(),
  });

  return websiteCreateSchema.validate(website);
}

export function validateWebsiteUpdate(website: Partial<Website>) {
  const websiteSaveSchema = Joi.object<Website>(websiteBaseSchema);

  return websiteSaveSchema.validate(website);
}
