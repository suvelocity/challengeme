module.exports = [
    /* 
        these user are valid for registertion.
        if U want to add them directly to your DB -->
            mockUser.password = await bcrypt.hash(mockUser.password, 10);
            mockUser.securityAnswer = await bcrypt.hash(mockUser.securityAnswer, 10);
            await User.create(mockUser); 
    */

    {
        first_name: "dekel",
        last_name: "vaknin",
        user_name: "dekdekdek",
        email: "dek@gmail.com",
        password: "blabla96",
        birth_date: new Date('1996/04/01'),
        country: "israel",
        city: "jerusalem",
        phone_number: "0546666666",
        github_account: "dekel-github",
        reason_of_registration: "cats videos",
        security_question: "What is the name, breed, and color of your favorite pet?",
        security_answer: "simba blue",
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        first_name: "roy",
        last_name: "shnitzer",
        user_name: "shnizel123",
        email: "shnizel@gmail.com",
        password: "shnizel1",
        birth_date: new Date('1997/04/01'),
        country: "israel",
        city: "tuval",
        phone_number: "0546666668",
        github_account: "shnizel-github",
        reason_of_registration: "coding",
        security_question: "What is the name, breed, and color of your favorite pet?",
        security_answer: "sequelize",
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        first_name: "david",
        last_name: "boostrap",
        user_name: "boostyboo",
        email: "boosty@gmail.com",
        password: "boosty000",
        birth_date: new Date('1997/04/01'),
        country: "gamadim",
        city: "gamzo",
        phone_number: "0546666667",
        github_account: "david-github",
        reason_of_registration: "design",
        security_question: "What is the name, breed, and color of your favorite pet?",
        security_answer: "boostrap",
        created_at: new Date(),
        updated_at: new Date(),
    }
]