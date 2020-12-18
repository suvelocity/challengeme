module.exports = {
  success: {
    onlyLeaders: {
      teamName: 'crm',
      leaders: [
        {
          userName: 'regularUser',
        },
        {
          userName: 'boosty123',
        },
      ],
    },
    leadersWithUsers: {
      teamName: 'crm',
      leaders: [
        {
          userName: 'roy',
        },
        {
          userName: 'david',
        },
      ],
      usersToCreate: [
        {
          userName: 'david',
          email: 'david@email.com',
        },
        {
          userName: 'roy',
          email: 'roy@email.com',
        },
      ],
    },
    leadersAndEvents: {
      teamName: 'crm',
      leaders: [
        {
          userName: 'regularUser',
        },
        {
          userName: 'boosty123',
        },
      ],
      eventsRegistration: {
        webhookUrl: 'http://localhost:8090/api/v1/webhook',
        events: ['startedChallenge', 'submittedChallenge'],
        authorizationToken: '1234567abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      },
    },
    fullRequest: {
      teamName: 'crm',
      leaders: [
        {
          userName: 'roy',
        },
        {
          userName: 'boosty123',
        },
      ],
      usersToCreate: [
        {
          userName: 'roy',
          email: 'roy@email.com',
        },
        {
          userName: 'nir',
          email: 'nir@email.com',
        },
      ],
      eventsRegistration: {
        webhookUrl: 'http://localhost:8090/api/v1/webhook',
        events: ['startedChallenge', 'submittedChallenge'],
        authorizationToken: '1234567abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      },
    },
  },
  fail: {
    onlyLeaders: {
      teamName: 'crm',
      leaders: [
        {
          userName: 'roy',
        },
        {
          userName: 'david',
        },
      ],
    },
    leadersNotInCreateList: {
      teamName: 'crm',
      leaders: [
        {
          userName: 'roy',
        },
        {
          userName: 'david',
        },
      ],
      usersToCreate: [
        {
          userName: 'david',
          email: 'david@email.com',
        },
        {
          userName: 'omer',
          email: 'omer@email.com',
        },
      ],
    },
    usersAlreadyExist: {
      teamName: 'crm',
      leaders: [
        {
          userName: 'regularUser',
        },
        {
          userName: 'david',
        },
      ],
      usersToCreate: [
        {
          userName: 'david',
          email: 'david@email.com',
        },
        {
          userName: 'regularUser',
          email: 'regularUser@email.com',
        },
      ],
    },
    leadersNotExistAndEvents: {
      teamName: 'crm',
      leaders: [
        {
          userName: 'roy',
        },
        {
          userName: 'david',
        },
      ],
      eventsRegistration: {
        webhookUrl: 'http://localhost:8090/api/v1/webhook',
        events: ['startedChallenge', 'submittedChallenge'],
        authorizationToken: '1234567abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      },
    },
    leadersAndBadEvents: {
      teamName: 'crm',
      leaders: [
        {
          userName: 'regularUser',
        },
        {
          userName: 'boosty123',
        },
      ],
      eventsRegistration: {
        webhookUrl: 'http://localhost:8090/api/v1/webhook',
        events: ['efg', 'abdc'],
        authorizationToken: '1234567abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      },
    },
    fullRequestAndBadEvents: {
      teamName: 'crm',
      leaders: [
        {
          userName: 'david',
        },
        {
          userName: 'boosty123',
        },
      ],
      usersToCreate: [
        {
          userName: 'david',
          email: 'david@email.com',
        },
        {
          userName: 'omer',
          email: 'omer@email.com',
        },
      ],
      eventsRegistration: {
        webhookUrl: 'http://localhost:8090/api/v1/webhook',
        events: ['efg', 'abdc'],
        authorizationToken: '1234567abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      },
    },
  },
};
