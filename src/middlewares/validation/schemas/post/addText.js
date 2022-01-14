import Joi from 'joi';

export default Joi.object().keys({
  type: Joi.string().min(3).max(10).required()
    .valid('Text')
    .error(() => 'Enter valid Post type Ex: Text.'),

  content: Joi.string().min(100).max(5000).required()
    .error(() => 'Your poem\'s content must be at least 100 characters long.'),

  color: Joi.required()
    .error(() => 'Please select a background color'),

  font: Joi.required()
    .error(() => 'Please select a font style of your poem'),

  caption: Joi.string().optional()
    .error(() => 'Enter a valid caption'),

  category: Joi.required()
    .error(() => 'Please select a category'),

  title: Joi.required()
    .error(() => 'Please add a title of your poem'),
  align: Joi.required()
    .error(() => 'Please add a text align option'),

}).options({ allowUnknown: false });
