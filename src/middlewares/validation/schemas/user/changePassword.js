import Joi from 'joi';

export default Joi.object().keys({

  newPassword: Joi.string().min(3).max(25).required()
    .error(() => 'Enter a strong password with characters between 3 and 25.'),

}).options({ allowUnknown: true });
