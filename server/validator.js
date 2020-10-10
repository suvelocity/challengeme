const Joi = require("@hapi/joi");

//Register Validation
const registerValidation = (data) => {
  const schema = Joi.object({
      firstName:Joi.string().min(1).required().regex(/^[a-zA-Z\s]*$/),
      lastName: Joi.string().min(1).required().regex(/^[a-zA-Z\s]*$/),
    username: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    country:Joi.string().min(1).required().regex(/^[a-zA-Z\s]*$/),
    city:Joi.string().min(1).required().regex(/^[a-zA-Z\s]*$/),
    birthdate:Joi.date(),
    phoneNumber:"",
    securityQuestion:"",
    securityAnswer:"",
    signUpReason:"",
    gitHub:"",
    password: Joi.string().min(8).required(),
  });

  return Joi.validate(data, schema);
};

//Login Validation
const loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(8).required(),
  });

  return schema.validate(data);
};

module.exports.loginValidation = loginValidation;
