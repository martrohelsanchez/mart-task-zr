import { Storage } from '@google-cloud/storage';
import { Express } from 'express';

import { FILE_PATH_UPLOAD } from 'src/commons/constants/filePathUpload';
import { IMAGE_OWNER_TYPE } from 'src/commons/types';

import { generateStoragePath } from 'src/server/utils/FileUtils';

import config from '../config/config';
import { createImage } from '../models';

type UploadFileParams = {
  file: Express.Multer.File;
  model: string;
  modelId: string;
  mountedAs: string;
  originalName: string;
};

const storage = new Storage();
const bucket = storage.bucket(config.BUCKET);

export function uploadFile(params: UploadFileParams) {
  return new Promise((resolve, reject) => {
    const { file, model, modelId, mountedAs, originalName } = params;

    const filePath = generateStoragePath({
      model,
      modelId,
      mountedAs,
      originalName,
    });

    const blob = bucket.file(filePath);

    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on('error', (err: Error) => {
      reject(err);
    });

    blobStream.on('finish', () => {
      resolve(filePath);
    });

    blobStream.end(file.buffer);
  });
}

type UploadFileWithImageEntityParams = {
  entityId: string;
  imageOwnerType: IMAGE_OWNER_TYPE;
  isPrimaryLogo: boolean;
  file: Express.Multer.File;
};

export async function uploadFileWithImageEntity(
  params: UploadFileWithImageEntityParams
) {
  const { entityId, file, imageOwnerType, isPrimaryLogo } = params;

  const image = await createImage({
    isPrimaryLogo: isPrimaryLogo ?? false,
    file: file.originalname,
    ownerId: entityId,
    ownerType: imageOwnerType,
  });

  const filePath = await uploadFile({
    model: FILE_PATH_UPLOAD.Image.MODEL,
    modelId: image.id,
    mountedAs: FILE_PATH_UPLOAD.Image.MOUNTED_AS,
    file,
    originalName: file.originalname,
  });

  return { filePath, image };
}
