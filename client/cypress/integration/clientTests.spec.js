describe("redirect", () => {
  it("can redirect to home for inexact urls", () => {
    cy.visit("/dfhksjdfhkjdsfhdk");
    cy.url().should("equal", "http://localhost:3000/");
    cy.visit("/login/a");
    cy.url().should("equal", "http://localhost:3000/");
    cy.visit("/register/a");
    cy.url().should("equal", "http://localhost:3000/");
    cy.visit("/forgot/a");
    cy.url().should("equal", "http://localhost:3000/");
  });

  it("can redirect from login", () => {
    cy.visit("/login");
    cy.contains("Forgot Password ?").click();
    cy.url().should("equal", "http://localhost:3000/forgot");
    cy.visit("/login");
    cy.contains("Sign up").click();
    cy.url().should("equal", "http://localhost:3000/register");
  });
  it("can redirect from register", () => {
    cy.visit("/register");
    cy.contains("Login Here").click();
    cy.url().should("equal", "http://localhost:3000/login");
  });
  it("can redirect from forgot", () => {
    cy.visit("/forgot");
    cy.contains("Login Here").click();
    cy.url().should("equal", "http://localhost:3000/login");
  });
});

describe("Register Form Test", () => {
  it("Can get all errors and submit register form", () => {
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
          },
        ],
      },
    ];
    cy.server();
    cy.route("POST", "**/api/v1/auth/userexist", { notExist: true });
    cy.route("POST", "**/api/v1/auth/register", {
      message: "Waiting for mail validation",
    }).as("register");
    cy.route("POST", "**/api/v1/auth/createuser", {
      message: "Register Success",
    }).as("createUser");
    cy.visit("/register");
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
    cy.wait("@register");

    cy.visit("/auth?token=djfhskdfhdskjf");
    cy.wait("@createUser");
    cy.url().should("equal", "http://localhost:3000/login");
  });
});

describe("login Tests", () => {
  it("can login", () => {
    cy.server();
    cy.route("POST", "**/api/v1/auth/login", "fixture:login.json").as(
      "loginUser"
    );

    cy.visit("/login");
    cy.get("#userNameField").type("Test");
    cy.get("#passwordField").type("12345678");
    cy.get("#loginButton").click();
    cy.wait("@loginUser");
    cy.url().should("equal", "http://localhost:3000/");
  });
  it("login errors", () => {
    const inputs = [
      {
        field: "userNameField",
        errors: [
          {
            falseValue: "Test!",
            message: "invalid userName",
          },
          {
            falseValue: "Teeeeeeeeeeeeeeeeeeeeeeeeeeeeeest!",
            message: "userName must be 1-32 characters long",
          },
        ],
        trueValue: "Test",
      },
      {
        field: "passwordField",
        errors: [
          {
            falseValue: "test",
            message: "password must be at least 8 characters long",
          },
        ],
        trueValue: "12345678",
      },
    ];
    cy.visit("/login");
    cy.get(`#passwordField`).type("a");
    inputs.forEach((input) => {
      input.errors.forEach((error) => {
        cy.get(`#${input.field}`).type(error.falseValue);
        cy.get("#loginButton").click();
        cy.get(".errorInput").should("contain", error.message);
        cy.get(`#${input.field}`).clear();
      });
      cy.get(`#${input.field}`).type(input.trueValue);
    });
    cy.get("#loginButton").click();
    cy.get(".errorInput").should("not.exist");
  });
});

describe("Change password", () => {
  it("can send a request to change password", () => {
    cy.server();
    cy.route("POST", "**/api/v1/auth/getquestion", {
      securityQuestion:
        "What is the name, breed, and color of your favorite pet?",
    }).as("getQuestion");
    cy.route("POST", "**/api/v1/auth/validateanswer", {
      resetToken: "423984732",
    }).as("validateAnswer");
    cy.route("PATCH", "**/api/v1/auth/passwordupdate", {
      message: "Changed Password Sucsessfuly",
    }).as("passwordUpdate");

    cy.visit("/forgot");
    cy.get("#userName").type("Amir");
    cy.get("#nextButton").click();
    cy.wait("@getQuestion");

    cy.get("#answer").type("Dogeyyyyyy");
    cy.get("#nextButton").click();
    cy.wait("@validateAnswer");

    cy.get("#newPassword").type("12345678");
    cy.get("#confirmNewPassword").type("12345678");
    cy.get("#nextButton").click();
    cy.wait("@passwordUpdate");
    cy.get('.swal2-confirm').click();
    cy.url().should("equal", "http://localhost:3000/login");
  });

  it("can show errors", () => {
    const pages = [
      {
        inputs: [
          {
            field: "userName",
            errors: [
              {
                falseValue: "Teeeeeeeeeeeeeeeeeeeeeeeeeeeeeest",
                message: "Please enter a valid username",
              },
              {
                falseValue: "Test!",
                message: "Please enter a valid username",
              },
            ],
            trueValue: "Test",
          },
        ],
      },
      {
        inputs: [
          {
            field: "answer",
            errors: [
              {
                falseValue: "short",
                message: "Answer should be longer",
              },
              {
                falseValue: "longanswer!",
                message: "Answer can not contain special characters",
              },
            ],
            trueValue: "legal answer",
          },
        ],
      },
      {
        inputs: [
          {
            field: "newPassword",
            errors: [
              {
                falseValue: "short",
                message: "password should be at least 8 characters",
              },
            ],
            trueValue: "newPassword",
          },
          {
            field: "confirmNewPassword",
            errors: [
              {
                falseValue: "doNotMatch",
                message: "passwords do not match",
              },
            ],
            trueValue: "newPassword",
          },
        ],
      },
    ];
    cy.server();
    cy.route("POST", "**/api/v1/auth/getquestion", {
      securityQuestion:
        "What is the name, breed, and color of your favorite pet?",
    }).as("getQuestion");
    cy.route("POST", "**/api/v1/auth/validateanswer", {
      resetToken: "423984732",
    }).as("validateAnswer");
    cy.route("PATCH", "**/api/v1/auth/passwordupdate", {
      message: "Changed Password Sucsessfuly",
    }).as("passwordUpdate");

    cy.visit("/forgot");

    pages.forEach((page) => {
      page.inputs.forEach((input) => {
        input.errors.forEach((error) => {
          cy.get(`#${input.field}`).type(error.falseValue);
          cy.get("#nextButton").click();
          cy.get(".errorInputForgotPass").should("contain", error.message);
          cy.get(`#${input.field}`).clear();
        });
        cy.get(`#${input.field}`).type(input.trueValue);
      });
      cy.get("#nextButton").click();
    });
  });
});
