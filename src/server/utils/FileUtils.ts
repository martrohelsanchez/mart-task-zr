import { GetSignedUrlConfig, Storage } from '@google-cloud/storage';

import {
  FileObject,
  FileObjectFull,
} from '../../commons/types/FileObject.type';
import config from '../config/config';
import { findUser } from '../models/UserModel';

import { formatAdmin } from './UserUtils';

type GenerateStoragePathParams = {
  model: string;
  modelId: string;
  mountedAs: string;
  originalName: string;
};

type GenerateReadSignedUrl = {
  bucket?: string;
  fileName: string;
};

type FormatFileObjectOptions = {
  shouldGetUser: boolean;
};

const storage = new Storage();

const MINS_30 = 30;

export function generateStoragePath(params: GenerateStoragePathParams) {
  const { model, modelId, mountedAs, originalName: originalname } = params;

  return `uploads/${model}/${mountedAs}/${modelId}/${originalname.replace(
    / /gi,
    '_'
  )}`;
}

export async function generateV4ReadSignedUrl(params: GenerateReadSignedUrl) {
  const { bucket = config.BUCKET, fileName } = params;

  if (!fileName) {
    return null;
  }

  const expiration = Date.now() + MINS_30 * 60 * 1000;
  const options: GetSignedUrlConfig = {
    version: 'v4',
    action: 'read',
    expires: expiration,
  };

  const [url] = await storage
    .bucket(bucket)
    .file(fileName)
    .getSignedUrl(options);

  return url;
}

export async function formatFileObject(
  fileObject: FileObject | null | undefined,
  options?: FormatFileObjectOptions
): Promise<FileObjectFull | null> {
  if (!fileObject) {
    return null;
  }

  const { uploadedById } = fileObject;

  const tempSignedUrl = (await generateV4ReadSignedUrl({
    fileName: fileObject.name,
  })) as string;

  const fileObjectResponse: FileObjectFull = {
    ...fileObject,
    tempSignedUrl,
    uploadedBy: undefined,
  };

  if (options?.shouldGetUser) {
    const uploader = await findUser({
      id: uploadedById,
    });

    fileObjectResponse.uploadedBy = formatAdmin(uploader);
  }

  return fileObjectResponse;
}
