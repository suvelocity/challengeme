const Joi = require('@hapi/joi');
const axios = require('axios');

// Register Validation
const registerValidation = (data) => {
  data.birthDate = new Date(data.birthDate).valueOf();
  const schema = Joi.object({
    firstName: [Joi.string().min(1).regex(/^[a-zA-Z\s]*$/).optional(), Joi.allow(null), Joi.allow('')],
    lastName: [Joi.string().min(1).regex(/^[a-zA-Z\s]*$/).optional(), Joi.allow(null), Joi.allow('')],
    userName: Joi.string().min(1).max(32).regex(/^[a-zA-Z0-9]*$/)
      .required(),
    email: Joi.string().min(6).email().required(),
    country: [Joi.string().min(1).regex(/^[a-zA-Z\s]*$/).optional(), Joi.allow(null), Joi.allow('')],
    city: [Joi.string().min(1).regex(/^[a-zA-Z\s]*$/).optional(), Joi.allow(null), Joi.allow('')],
    birthDate: [Joi.number().max((new Date()).valueOf()).optional(), Joi.allow(null), Joi.allow('')],
    phoneNumber: [Joi.string().regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/).optional(), Joi.allow(null), Joi.allow('')],
    securityQuestion: Joi.string().valid('When you were young, what did you want to be when you grew up?', 'Who was your childhood hero?', 'Where was your best family vacation as a kid?', 'What is the name, breed, and color of your favorite pet?', 'What was the first concert you attended?').required(),
    securityAnswer: Joi.string().min(8).regex(/^[\w\s]*$/).required(),
    reasonOfRegistration: [Joi.string().min(1).regex(/^[a-zA-Z\s]*$/).optional(), Joi.allow(null), Joi.allow('')],
    githubAccount: [Joi.string().min(1).regex(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i).optional(), Joi.allow(null), Joi.allow('')],
    password: Joi.string().min(8).required(),
  });

  return schema.validate(data);
};

// Personal Info Change User Details
const editUserValidation = (data) => {
  data.birthDate ? data.birthDate = new Date(data.birthDate).valueOf() : null;
  const schema = Joi.object({
    firstName: [Joi.string().min(1).regex(/^[a-zA-Z\s]*$/).optional(), Joi.allow(null), Joi.allow('')],
    lastName: [Joi.string().min(1).regex(/^[a-zA-Z\s]*$/).optional(), Joi.allow(null), Joi.allow('')],
    email: Joi.string().min(6).email(),
    country: [Joi.string().min(1).regex(/^[a-zA-Z\s]*$/).optional(), Joi.allow(null), Joi.allow('')],
    city: [Joi.string().min(1).regex(/^[a-zA-Z\s]*$/).optional(), Joi.allow(null), Joi.allow('')],
    phoneNumber: [Joi.string().regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/).optional(), Joi.allow(null), Joi.allow('')],
    birthDate: [Joi.number().max((new Date()).valueOf()).optional(), Joi.allow(null), Joi.allow('')],
    githubAccount: [Joi.string().min(1).regex(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i).optional(), Joi.allow(null), Joi.allow('')],

  });

  return schema.validate(data);
};

// Personal Info Change Password
const changePasswordValidation = (data) => {
  const schema = Joi.object({
    oldPassword: Joi.string().min(8).required(),
    newPassword: Joi.string().min(8).required(),
  });

  return schema.validate(data);
};

// Login Validation
const loginValidation = (data) => {
  const schema = Joi.object({
    userName: Joi.string().min(1).max(32).regex(/^[a-zA-Z0-9]*$/)
      .required(),
    password: Joi.string().min(8).required(),
    rememberMe: Joi.boolean().required(),
  });

  return schema.validate(data);
};

const method = async (value, helpers) => {
  try {
    await axios.get(
      `/api/v1/services/public-repo?repo_name=${value}`,
    );
  } catch (err) {
    return helpers.error('any.invalid');
  }
  return value;
};

const newChallengeValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(100).required(),
    description: Joi.string().min(1).max(500).required(),
    type: Joi.string().valid('client-only', 'fullstack-mysql', 'fullstack', 'server-mysql', 'server-only').required(),
    repositoryName: Joi.string().custom(method, 'custom1').required(),
    boilerPlate: Joi.string().custom(method, 'custom2').required(),
    authorId: Joi.number().required(),
  });

  return schema.validate(data);
};

// User Validation
const userValidation = (data) => {
  const schema = Joi.object({
    userName: Joi.string().min(1).max(32).regex(/^[a-zA-Z0-9]*$/)
      .required(),
  });

  return schema.validate(data);
};

// Token Validation
const tokenValidation = (data) => {
  const schema = Joi.object({
    token: Joi.string().required(),
  });

  return schema.validate(data);
};

// Answer Validation
const answerValidation = (data) => {
  const schema = Joi.object({
    userName: Joi.string().min(1).max(32).regex(/^[a-zA-Z0-9]*$/)
      .required(),
    securityAnswer: Joi.string().min(8).regex(/^[\w\s]*$/).required(),
  });

  return schema.validate(data);
};

// Password Update Validation
const pwdUpdateValidation = (data) => {
  const schema = Joi.object({
    resetToken: Joi.string().required(),
    password: Joi.string().min(8).required(),
  });

  return schema.validate(data);
};

// Webhook Events Registration Validation
const webhookEventsValidation = (data) => {
  const schema = Joi.object({
    externalId: Joi.string().guid({ version: ['uuidv4'] }).required(),
    webhookUrl: Joi.string().uri().required(),
    events: Joi.array().items(Joi.string().regex(/^[a-zA-Z\s]*$/)).min(1).required(),
    authorizationToken: Joi.string().min(1),
  });
  return schema.validate(data);
};

// Webhook Events Change Authorization Validation
const webhookAuthorizationChangeValidation = (data) => {
  const schema = Joi.object({
    externalId: Joi.string().guid({ version: ['uuidv4'] }).required(),
    webhookUrl: Joi.string().uri().required(),
    authorizationToken: Joi.string().min(1).required(),
  });
  return schema.validate(data);
};

// Webhook Events Change Url Validation
const webhookUrlChangeValidation = (data) => {
  const schema = Joi.object({
    externalId: Joi.string().guid({ version: ['uuidv4'] }).required(),
    oldWebhookUrl: Joi.string().uri().required(),
    newWebhookUrl: Joi.string().uri().required(),
  });
  return schema.validate(data);
};

// Webhook Events Logout Validation
const webhookEventsLogoutValidation = (data) => {
  const schema = Joi.object({
    externalId: Joi.string().guid({ version: ['uuidv4'] }).required(),
    webhookUrl: Joi.string().uri().required(),
    events: Joi.array().items(Joi.string().regex(/^[a-zA-Z\s]*$/)).min(1).required(),
  });
  return schema.validate(data);
};

// Webhook Creating Multiplied User Validation
const webhookAddUsersValidation = (data) => {
  if (data.users && Array.isArray(data.users)) {
    data.users = data.users.map((user) => {
      user.birthDate ? new Date(user.birthDate).valueOf() : undefined;
      return user;
    });
  }
  const schema = Joi.object({
    externalId: Joi.string().guid({ version: ['uuidv4'] }).required(),
    usersToCreate: Joi.array().items(
      Joi.object({
        leader: Joi.string().valid('true'),
        firstName: Joi.string().min(1).regex(/^[a-zA-Z\s]*$/),
        lastName: Joi.string().min(1).regex(/^[a-zA-Z\s]*$/),
        userName: Joi.string().min(1).max(32).regex(/^[a-zA-Z0-9]*$/)
          .required(),
        email: Joi.string().min(6).email().required(),
        country: Joi.string().min(1).regex(/^[a-zA-Z\s]*$/),
        city: Joi.string().min(1).regex(/^[a-zA-Z\s]*$/),
        birthDate: Joi.number().max((new Date()).valueOf()),
        phoneNumber: Joi.string().regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/),
        reasonOfRegistration: Joi.string().min(1).regex(/^[a-zA-Z\s]*$/),
        githubAccount: Joi.string().min(1).regex(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i),
      }),
    ).min(1).max(100)
      .required(),
  });
  return schema.validate(data);
};

// Webhook Creating Team Validation
const webhookCreateTeamValidation = (data) => {
  if (data.usersToCreate && Array.isArray(data.usersToCreate)) {
    data.usersToCreate = data.usersToCreate.map((user) => {
      user.birthDate ? new Date(user.birthDate).valueOf() : undefined;
      return user;
    });
  }
  const schema = Joi.object({
    teamName: Joi.string().min(1).max(32).regex(/^[a-zA-Z0-9]*$/)
      .required(),
    leaders: Joi.array().items(
      Joi.object({
        userName: Joi.string().min(1).max(32).regex(/^[a-zA-Z0-9]*$/)
          .required(),
      }),
    ).min(1).max(100)
      .required(),
    usersToCreate: Joi.array().items(
      Joi.object({
        firstName: Joi.string().min(1).regex(/^[a-zA-Z\s]*$/),
        lastName: Joi.string().min(1).regex(/^[a-zA-Z\s]*$/),
        userName: Joi.string().min(1).max(32).regex(/^[a-zA-Z0-9]*$/)
          .required(),
        email: Joi.string().min(6).email().required(),
        country: Joi.string().min(1).regex(/^[a-zA-Z\s]*$/),
        city: Joi.string().min(1).regex(/^[a-zA-Z\s]*$/),
        birthDate: Joi.number().max((new Date()).valueOf()),
        phoneNumber: Joi.string().regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/),
        reasonOfRegistration: Joi.string().min(1).regex(/^[a-zA-Z\s]*$/),
        githubAccount: Joi.string().min(1).regex(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i),
      }),
    ).min(1).max(100),
    eventsRegistration: Joi.object({
      webhookUrl: Joi.string().uri().required(),
      events: Joi.array().items(Joi.string().regex(/^[a-zA-Z\s]*$/)).min(1).required(),
      authorizationToken: Joi.string().min(1),
    }),
  });
  return schema.validate(data);
};

// Webhook Change Permissions Validation
const webhookChangePermissionsValidation = (data) => {
  const schema = Joi.object({
    externalId: Joi.string().guid({ version: ['uuidv4'] }).required(),
    usersToBeLeaders: Joi.array().items(
      Joi.object({
        userName: Joi.string().min(1).max(32).regex(/^[a-zA-Z0-9]*$/)
          .required(),
      }),
    ).min(1).max(100)
      .required(),
  });
  return schema.validate(data);
};

// Webhook Event Trigger Validation
const webhookUrlEventTriggerValidation = (data) => {
  const schema = Joi.object({
    challengeName: Joi.string().required(),
  });
  return schema.validate(data);
};

// Webhook Github Response Validation
const webhookUrlGithubResponseValidation = (data) => {
  const schema = Joi.object({
    success: Joi.boolean().required(),
  });
  return schema.validate(data);
};

module.exports = {
  loginValidation,
  registerValidation,
  userValidation,
  tokenValidation,
  pwdUpdateValidation,
  answerValidation,
  newChallengeValidation,
  webhookEventsValidation,
  webhookAddUsersValidation,
  webhookCreateTeamValidation,
  webhookAuthorizationChangeValidation,
  webhookUrlChangeValidation,
  webhookEventsLogoutValidation,
  webhookChangePermissionsValidation,
  webhookUrlEventTriggerValidation,
  webhookUrlGithubResponseValidation,
  editUserValidation,
  changePasswordValidation,
};
