import Joi from 'joi';

export default Joi.object().keys({
  categoryName: Joi.string().min(3).max(30).required()
    .error(() => 'Enter valid category name. A valid category name should be like: Romantic, Sadness, ...'),

  description: Joi.string().min(3).max(80).optional()
    .error(() => 'Enter a clear and understandable category description Ex: Poems in this category are meant for those ...'),

  coverPhoto: Joi.string().uri()
    .error(() => 'Enter a file with an image file-type.'),
}).options({ allowUnknown: false });
