describe("Nitzan", () => {
  it("Listman", () => {
    cy.visit("/register");
    // const fields = ["firstName", "lastName", "userName", "email"];
    // const falseValues = ["666666", "666666", "hello!", "hhhhh@gmaicom"];
    // const trueValues = ["nitzan", "listman", "nitzannnnnn", "email@email.com"];
    // const errors = [
    //   "First name must contain only letters.",
    //   "Last name  must contain only letters.",
    //   "Username must contain only letters and numbers.",
    //   "Email invalid.",
    //   "Country must contain only letters",
    //   "City must contain only letters",
    //   "Birth date required",
    //   "Birth date must be in the past.",
    // ];
    const inputs = [
        {
            field: 'firstName',
            errors: [
                {
                    falseValue: '666666',
                    message: 'First name must contain only letters.'
                }
            ],
            trueValue: 'Amir'
        },
        {
            field: 'lastName',
            errors: [
                {
                    falseValue: '666666',
                    message: "Last name must contain only letters."
                }
            ],
            trueValue: 'Debbie'
        },
        {
            field: 'userName',
            errors: [
                {
                    falseValue: '!#$_check!!!!',
                    message: "Username must contain only letters and numbers."
                },
                {
                    falseValue: 'ThisUserNameIsTooLongFofdsfdsfdsfdsfdsfdsfdsfdsfdsfsdfdsrPassing',
                    message: "Username to long."
                }
            ],
            trueValue: 'Nitzan'
        },
        {
            field: 'email',
            errors: [
                {
                    falseValue: 'hhhhh@gmaicom',
                    message: 'Email invalid.'
                }
            ],
            trueValue: 'Amir@mail.com'
        }
    ]
    inputs.forEach(input => {
        input.errors.forEach(error => {
            cy.get(`#${input.field}`).type(error.falseValue)
            cy.get("#nextButton").click();
            cy.get(".errorInputRegister").should("contain", error.message);
            cy.get(`#${input.field}`).clear();
        })
        cy.get(`#${input.field}`).type(input.trueValue);
    })
  });
});
