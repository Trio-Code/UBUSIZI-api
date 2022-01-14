import AWS from 'aws-sdk';
import fs from 'fs';
import { v4 as uuidV4 } from 'uuid';
import { promisify } from 'util';

import config from '../config';

AWS.config.update({
  region: config.AWS_S3_REGION,
  credentials: {
    accessKeyId: config.AWS_KEY_ID,
    secretAccessKey: config.AWS_KEY_SECRET
  }
});
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
const readFileAsync = promisify(fs.readFile);

export const upload = async (bucket, file) => {
  try {
    const extension = file.name.split('.').pop();
    const FileToUpload = await readFileAsync(file.tempFilePath);
    const uploadParams = {
      Bucket: bucket,
      Key: `${uuidV4()}.${extension}`,
      Body: FileToUpload
    };
    const data = await s3.upload(uploadParams).promise();
    return {
      file: FileToUpload,
      data
    };
  } catch (error) {
    throw error;
  }
};

export const uploadImage = async (bucket, file) => {
  try {
    const raw = await upload(bucket, file);
    return {
      key: raw.data.Location
    };
  } catch (error) {
    throw error;
  }
};

export const uploadPost = async (bucket, file) => {
  try {
    const raw = await upload(bucket, file);
    return {
      key: raw.data.Location
    };
  } catch (error) {
    throw error;
  }
};
