const Joi = require("@hapi/joi");

//Register Validation
const registerValidation = (data) => {
  data.birthDate = new Date(data.birthDate).valueOf();
  const schema = Joi.object({
    firstName: Joi.string().min(1).required().regex(/^[a-zA-Z\s]*$/),
    lastName: Joi.string().min(1).required().regex(/^[a-zA-Z\s]*$/),
    userName: Joi.string().min(1).max(32).required(/^[a-zA-Z0-9]*$/),
    email: Joi.string().min(6).required().email(),
    country: Joi.string().min(1).required().regex(/^[a-zA-Z\s]*$/),
    city: Joi.string().min(1).required().regex(/^[a-zA-Z\s]*$/),
    birthDate: Joi.number().max((new Date()).valueOf()),
    phoneNumber: Joi.string().regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/),
    securityQuestion: Joi.string().valid("When you were young, what did you want to be when you grew up?", "Who was your childhood hero?", "Where was your best family vacation as a kid?", "What is the name, breed, and color of your favorite pet?", "What was the first concert you attended?"),
    securityAnswer: Joi.string().min(8).regex(/^[\w\s]*$/),
    reasonOfRegistration: Joi.string().min(1).regex(/^[a-zA-Z\s]*$/),
    githubAccount: Joi.string().min(1).regex(/\w/),
    password: Joi.string().min(8).required(),
  });

  return schema.validate(data);
};

//Login Validation
const loginValidation = (data) => {
  const schema = Joi.object({
    userName: Joi.string().min(1).max(32).regex(/^[a-zA-Z0-9]*$/).required(),
    password: Joi.string().min(8).required(),
    rememberMe: Joi.boolean()
  });

  return schema.validate(data);
};

//User Validation
const userValidation = (data) => {
  const schema = Joi.object({
    userName: Joi.string().min(1).max(32).regex(/^[a-zA-Z0-9]*$/).required(),
  });

  return schema.validate(data);
};

//Token Validation
const tokenValidation = (data) => {
  const schema = Joi.object({
    token: Joi.string().required(),
  })

  return schema.validate(data);
}

//Answer Validation
const answerValidation = (data) => {
  const schema = Joi.object({
    userName: Joi.string().min(1).max(32).required(/^[a-zA-Z0-9]*$/),
    securityAnswer: Joi.string().min(8).regex(/^[\w\s]*$/),
  })

  return schema.validate(data);
}

//Password Update Validation
const pwdUpdateValidation = (data) => {
  const schema = Joi.object({
    resetToken: Joi.string().required(),
    password: Joi.string().min(8).required(),
  })

  return schema.validate(data);
}

module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;
module.exports.userValidation=userValidation;
module.exports.tokenValidation = tokenValidation;
module.exports.pwdUpdateValidation = pwdUpdateValidation;
module.exports.answerValidation = answerValidation;
