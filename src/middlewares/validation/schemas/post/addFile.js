import Joi from 'joi';

export default Joi.object().keys({

  type: Joi.string().min(3).max(10).required()
    .valid('Audio', 'Video', 'Image')
    .error(() => 'Enter valid Post type Ex: Image or Video.'),

  content: Joi.string().uri()
    .error(() => 'You must upload a file to continue.'),

  caption: Joi.string().optional()
    .error(() => 'Enter a valid caption'),

  category: Joi.required()
    .error(() => 'Please select a category'),

}).options({ allowUnknown: false });
