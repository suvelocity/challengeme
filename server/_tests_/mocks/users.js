const bcrypt = require('bcrypt')

/* 
        these user are valid for registertion.
        if U want to add them directly to your DB -->
        mockUser.password = await bcrypt.hash(mockUser.password, 10);
        mockUser.securityAnswer = await bcrypt.hash(mockUser.securityAnswer, 10);
        await User.create(mockUser); 
*/

module.exports = async () => {
     return [
    {
        firstName: "dekel",
        lastName: "vaknin",
        userName: "dekdekdek",
        email: "dek@gmail.com",
        password: await bcrypt.hash("blabla96", 10),
        birthDate: new Date('1996/04/01'),
        country: "israel",
        city: "jerusalem",
        phone_number: "0546666666",
        github_account: "dekel.github",
        reason_of_registration: "cats videos",
        security_question: "dog",
        security_answer: "budy",
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        firstName: "roy",
        lastName: "shnitzer",
        userName: "shnizel123",
        email: "shnizel@gmail.com",
        password: await bcrypt.hash("shnizel12", 10),
        birthDate: new Date('1997/04/01'),
        country: "israel",
        city: "tuval",
        phone_number: "0546666668",
        github_account: "shnizel.github",
        reason_of_registration: "coding",
        security_question: "favorate library",
        security_answer: "sequelize",
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        firstName: "david",
        lastName: "boostrap",
        userName: "boosty123",
        email: "boosty@gmail.com",
        password: await bcrypt.hash("boosty012", 10),
        birthDate: new Date('1997/04/01'),
        country: "gamadim",
        city: "gamzo",
        phone_number: "0546666667",
        github_account: "david.github",
        reason_of_registration: "design",
        security_question: "favorate library",
        security_answer: "boostrap",
        created_at: new Date(),
        updated_at: new Date()
    }
]
}