import Joi from 'joi';

export default Joi.object().keys({
  firstname: Joi.string().min(3).max(30).required()
    .error(() => 'A firstname is required Ex: Jules. Names with characters less than 3 won\'t be accepted'),

  lastname: Joi.string().min(3).max(30).required()
    .error(() => 'A lastname is required Ex: Gasana. Names with characters less than 3 won\'t be accepted'),

  username: Joi.string().required()
    .regex(/^[a-z0-9_.]{3,25}$/)
    .error(() => 'Enter a valid username. You can include numbers and characters like _ and . and don\'t include capital letters Ex: _emm.54'),

  password: Joi.string().min(3).max(25).required()
    .error(() => 'Enter a strong password with characters between 3 and 25.'),

  email: Joi.string().required().email()
    .error(() => 'Enter a valid email'),

}).options({ allowUnknown: false });
