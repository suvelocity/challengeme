describe("Error test", () => {
  it("Can get all errors and submit register form", () => {
    cy.visit("/register");
    const pages = [
      {
        inputs: [
          {
            field: "firstName",
            errors: [
              {
                falseValue: "666666",
                message: "First name must contain only letters.",
              },
            ],
            trueValue: "Amir",
          },
          {
            field: "lastName",
            errors: [
              {
                falseValue: "666666",
                message: "Last name must contain only letters.",
              },
            ],
            trueValue: "Debbie",
          },
          {
            field: "userName",
            errors: [
              {
                falseValue: "!#$_check!!!!",
                message: "Username must contain only letters and numbers.",
              },
              {
                falseValue:
                  "ThisUserNameIsTooLongFofdsfdsfdsfdsfdsfdsfdsfdsfdsfsdfdsrPassing",
                message: "Username to long.",
              },
            ],
            trueValue: "Nitzan",
          },
          {
            field: "email",
            errors: [
              {
                falseValue: "hhhhh@gmaicom",
                message: "Email invalid.",
              },
            ],
            trueValue: "Amir@mail.com",
          },
        ],
      },
      {
        inputs: [
          {
            field: "country",
            errors: [
              {
                falseValue: "israel1",
                message: "Country must contain only letters",
              },
            ],
            trueValue: "israel",
          },
          {
            field: "city",
            errors: [
              {
                falseValue: "israel1",
                message: "City must contain only letters",
              },
            ],
            trueValue: "herzeliya",
          },
          {
            field: "birthDate",
            errors: [
              {
                falseValue: "2021-01-01",
                message: "Birth date must be in the past.",
              },
            ],
            trueValue: "2020-01-01",
          },
          {
            field: "phoneNumber",
            errors: [
              {
                falseValue: "738734jd",
                message: "Invalid phone number",
              },
            ],
            trueValue: "05455555555",
          },
        ],
      },
      {
        inputs: [
          {
            field: "password",
            errors: [
              {
                falseValue: "1",
                message: "Password needs to be at least 8 characters.",
              },
            ],
            trueValue: "password!!",
          },
          {
            field: "confirmPassword",
            errors: [
              { falseValue: "a", message: "Passwords must be identical." },
            ],
            trueValue: "password!!",
          },
          {
            field: "securityQuestion",
            errors: [],
            trueValue: "Who was your childhood hero?",
            type: "select 1",
          },
          {
            field: "securityAnswer",
            errors: [
              {
                falseValue: "a",
                message: "Security answer should be at least 8 characters.",
              },
              {
                falseValue: "!!!!!!!!!!!!",
                message: "Security answer cant contain special characters.",
              },
            ],
            trueValue: "myAnswerrrr",
          },
        ],
      },
      {
        inputs: [
          {
            field: "signUpReason",
            errors: [],
            trueValue: "Other",
            type: "select 2",
          },
          {
            field: "github",
            errors: [
              {
                falseValue: "dfkjhskdf!!!!!",
                message: "GitHub account is invalid.",
              },
            ],
            trueValue: "myAnswerrrr",
          }
        ],
      },
    ];

    pages.forEach((page) => {
      page.inputs.forEach((input) => {
        if (input.type === "select 2") {
          cy.get("#signUpReason").click();
          cy.get('[data-value="Other"]').click();
        } else if (input.type === "select 1") {
          cy.get("#securityQuestion").click();
          cy.get('[data-value="Who was your childhood hero?"]').click();
        } else {
          input.errors.forEach((error) => {
            //cy.get(`#${input.field}`).select(error.trueValue, {force: true});
            cy.get(`#${input.field}`).type(error.falseValue);
            cy.get("#nextButton").click();
            cy.get(".errorInputRegister").should("contain", error.message);
            cy.get(`#${input.field}`).clear();
          });
          cy.get(`#${input.field}`).type(input.trueValue);
        }
      });
      //Move to next page
      cy.get("#nextButton").click();
    });
    cy.get('.MuiCircularProgress-svg').should('exist');
  });
});
