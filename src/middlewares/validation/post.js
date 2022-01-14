/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import validator from '../../helpers/validator';
import out from '../../helpers/response';
import addFileSchema from './schemas/post/addFile';
import addTextSchema from './schemas/post/addText';
import { extension } from '../../helpers/extension';

export const addPost = (req, res, next) => {
  const { type } = req.body;
  if (type === 'Text') {
    validator(addTextSchema, req.body, res, next);
  } else {
    const ext = extension(req.files);
    if ((type === 'Audio' && (ext === 'mp3' || ext === 'm4a')) || (type === 'Image' && (ext === 'jpg' || ext === 'JPG' || ext === 'png' || ext === 'jpeg' || ext === 'JPEG' || ext === 'pdf')) || (type === 'Video' && (ext === 'mp4' || ext === 'MP4' || ext === 'vob' || ext === '3gp'))) {
      validator(addFileSchema, req.body, res, next);
    } else {
      return out(res, 400, 'Upload a file that matches the post type', null, 'BAD_REQUEST');
    }
  }
};
