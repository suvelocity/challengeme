const bcrypt = require('bcrypt')

module.exports = async () => {
    [
        {
            firstName: "dekel",
            lastName: "vaknin",
            userName: "dekdekdek",
            email: "dek@gmail.com",
            password: await bcrypt.hash("blabla96", 10),
            birthDate: new Date('1996/04/01'),
            country: "israel",
            city: "jerusalem",
            phoneNumber: "0546666666",
            githubAccount: "dekel.github",
            reasonOfRegistration: "cats videos",
            securityQuestion: "dog",
            securityAnswer: "budy",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            firstName: "roy",
            lastName: "shnitzer",
            userName: "shnizel",
            email: "shnizel@gmail.com",
            password: await bcrypt.hash("shnizel1", 10),
            birthDate: new Date('1997/04/01'),
            country: "israel",
            city: "tuval",
            phoneNumber: "0546666668",
            githubAccount: "shnizel.github",
            reasonOfRegistration: "coding",
            securityQuestion: "favorate library",
            securityAnswer: "sequelize",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            firstName: "david",
            lastName: "boostrap",
            userName: "boosty",
            email: "boosty@gmail.com",
            password: await bcrypt.hash("boosty0", 10),
            birthDate: new Date('1997/04/01'),
            country: "gamadim",
            city: "gamzo",
            phoneNumber: "0546666667",
            githubAccount: "david.github",
            reasonOfRegistration: "design",
            securityQuestion: "favorate library",
            securityAnswer: "boostrap",
            createdAt: new Date(),
            updatedAt: new Date()
        }
]
}