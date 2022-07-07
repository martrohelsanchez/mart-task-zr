import { convertObjectToFormData } from '../utils/FormDataUtils';

import ApiClient from './ApiClient';

const apiVersion = '1.0';
const endpoint = 'upload';
const url = `${apiVersion}/${endpoint}`;

type UploadFileParams = {
  file: File;
  model: string;
  modelId: string;
  mountedAs: string;
};

const contentTypeFormData = {
  headers: {
    'content-type': 'multipart/form-data',
  },
};

export async function uploadFile(params: UploadFileParams) {
  const formData = convertObjectToFormData(params);

  const { data } = await ApiClient.post(
    `${url}`,
    formData,
    contentTypeFormData
  );

  return data;
}
