const Joi = require("@hapi/joi");

//Register Validation
const registerValidation = (data) => {
  const schema = Joi.object({
      firstName:Joi.string().min(1).required().regex(/^[a-zA-Z\s]*$/),
      lastName: Joi.string().min(1).required().regex(/^[a-zA-Z\s]*$/),
    username: Joi.string().min(6).max(32).required(/\w/),
    email: Joi.string().min(6).required().email(),
    country:Joi.string().min(1).required().regex(/^[a-zA-Z\s]*$/),
    city:Joi.string().min(1).required().regex(/^[a-zA-Z\s]*$/),
    birthdate:Joi.date().max(new Date()),
    phoneNumber:Joi.string().regex(/^[0-9]*$/),
    securityQuestion:Joi.string().equal(["When you were young, what did you want to be when you grew up?","Who was your childhood hero?","Where was your best family vacation as a kid?","What is the name, breed, and color of your favorite pet?","What was the first concert you attended?"]),
    securityAnswer:Joi.string().min(6).regex(/^[a-zA-Z\s]*$/),
    signUpReason:Joi.string().min(6).regex(/^[a-zA-Z\s]*$/),
    gitHub:Joi.string().min(1).regex(/\w/),
    password: Joi.string().min(8).required(),
  });

  return Joi.validate(data, schema);
};

//Login Validation
const loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).max(32).regex(/\w/).required(),
    password: Joi.string().min(8).required(),
  });

  return schema.validate(data);
};

//Token Validation
const tokenValidation = (data)=>{
  const schema = Joi.object({
    token: Joi.string().required(),
  })

  return schema.validate(data);
}

//Password Update Validation
const pwdUpdate = (data)=>{
  const schema=Joi.object({
    token: Joi.string().required(),
    password: Joi.string().min(8).required(),
  })

  return schema.validate(data);
}

module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;
module.exports.tokenValidation = tokenValidation;
module.exports.pwdUpdate=pwdUpdate;
