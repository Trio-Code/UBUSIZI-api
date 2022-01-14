import Joi from 'joi';

export default Joi.object().keys({
  content1: Joi.string().uri()
    .error(() => 'File 1 is mandatory.'),

  content2: Joi.string().uri().optional()
    .error(() => 'Enter a supported file ex:.mp4, .jpg, .docx'),

  content3: Joi.string().uri().optional()
    .error(() => 'Enter a supported file ex:.mp4, .jpg, .docx'),

  reason: Joi.string().min(3).max(100).required()
    .error(() => 'Enter a clear and comprehensive description.'),
}).options({ allowUnknown: false });
