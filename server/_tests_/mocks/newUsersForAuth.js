module.exports = [
    /* 
        these user are valid for registertion.
        if U want to add them directly to your DB -->
            mockUser.password = await bcrypt.hash(mockUser.password, 10);
            mockUser.securityAnswer = await bcrypt.hash(mockUser.securityAnswer, 10);
            await User.create(mockUser); 
    */

    {
        firstName: "dekel",
        lastName: "vaknin",
        userName: "dekdekdek",
        email: "dek@gmail.com",
        password: "blabla96",
        birth_date: new Date('1996/04/01'),
        country: "israel",
        city: "jerusalem",
        phoneNumber: "0546666666",
        githubAccount: "dekel-github",
        reasonOfRegistration: "cats videos",
        securityQuestion: "What is the name, breed, and color of your favorite pet?",
        securityAnswer: "simba blue",
    },
    {
        firstName: "roy",
        lastName: "shnitzer",
        userName: "shnizel123",
        email: "shnizel@gmail.com",
        password: "shnizel1",
        birth_date: new Date('1997/04/01'),
        country: "israel",
        city: "tuval",
        phoneNumber: "0546666668",
        githubAccount: "shnizel-github",
        reasonOfRegistration: "coding",
        securityQuestion: "What is the name, breed, and color of your favorite pet?",
        securityAnswer: "sequelize",
    },
    {
        firstName: "david",
        lastName: "boostrap",
        userName: "boostyboo",
        email: "boosty@gmail.com",
        password: "boosty000",
        birthDate: new Date('1997/04/01'),
        country: "gamadim",
        city: "gamzo",
        phoneNumber: "0546666667",
        githubAccount: "david-github",
        reasonOfRegistration: "design",
        securityQuestion: "What is the name, breed, and color of your favorite pet?",
        securityAnswer: "boostrap",
    }
]