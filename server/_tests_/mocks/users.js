// const bcrypt = require('bcrypt')

/*
        these user are valid for registertion.
        if U want to add them directly to your DB -->
        mockUser.password = await bcrypt.hashSync(mockUser.password, 10);
        mockUser.securityAnswer = await bcrypt.hashSync(mockUser.securityAnswer, 10);
        await User.create(mockUser);
*/

module.exports = [
  {
    firstName: 'dekel',
    lastName: 'vaknin',
    userName: 'dek12345',
    email: 'dek@gmail.com',
    password: '12345678', // password: 'blabla96'
    birthDate: new Date('1996/04/01'),
    country: 'israel',
    city: 'jerusalem',
    phoneNumber: '0546666666',
    githubAccount: 'dekelGithub',
    reasonOfRegistration: 'cats videos',
    securityQuestion: 'Who was your childhood hero?',
    securityAnswer: 'budybudy',
  },
  {
    firstName: 'roy',
    lastName: 'shnitzer',
    userName: 'shnizel123',
    email: 'shnizel@gmail.com',
    password: '87654321',
    birthDate: new Date('1997/04/01'),
    country: 'israel',
    city: 'tuval',
    phoneNumber: '0546666668',
    githubAccount: 'shnizelGithub',
    reasonOfRegistration: 'coding',
    securityQuestion: 'Who was your childhood hero?',
    securityAnswer: 'sequelize',
  },
  {
    firstName: 'david',
    lastName: 'boostrap',
    userName: 'boosty123',
    email: 'boosty@gmail.com',
    password: '123454321',
    birthDate: new Date('1997/04/01'),
    country: 'gamadim',
    city: 'gamzo',
    phoneNumber: '0546666667',
    githubAccount: 'davidGithub',
    reasonOfRegistration: 'design',
    securityQuestion: 'Who was your childhood hero?',
    securityAnswer: 'boostrap',
  },
];
