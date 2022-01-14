import Joi from 'joi';

export default Joi.object().keys({
  firstname: Joi.string().optional().min(3).max(30)
    .error(() => 'Enter valid firstname Ex: Jules'),

  lastname: Joi.string().optional().min(3).max(30)
    .error(() => 'Enter valid lastname Ex: Gasana'),

  bio: Joi.string().min(5).max(250).optional()
    .error(() => 'Enter valid biography Ex: My Bio'),

  username: Joi.string().optional()
    .regex(/^[a-z0-9_.]{3,25}$/)
    .error(() => 'Enter a valid username. You can include numbers and characters like _ and . don\'t include capital letters Ex: _emm.54')
}).options({ allowUnknown: true });
