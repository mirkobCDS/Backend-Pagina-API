const Joi = require('@hapi/joi');

// New User validation 
const newUserValidation = (data) => {
    const schema = Joi.object({
        nombre: Joi.string().min(3).required(),
        mail: Joi.string().min(5).required().email(),
        rol: Joi.string().required(),
        password: Joi.string().min(3).required(),
        respuesta: Joi.string().required(),
        telefono:Joi.string().min(10).required()
    })
    return schema.validate(data);
}

// Login validation
const loginValidation = (data) => {
    const schema = Joi.object({
        mail: Joi.string().min(5).required().email(),
        password: Joi.string().min(9).required()
    })
    return schema.validate(data);
}


module.exports.newUserValidation = newUserValidation;
module.exports.loginValidation = loginValidation;