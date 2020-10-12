import 'cypress-file-upload';

const expectedDescription = "dcnlkdncdkncdkacndkcndkjcndakcndkwcndkncdkncdkncdk..."

describe("Inserted New Challenge", () => {
    it("cant send empty form ", () => {
        cy.visit("http://localhost:3000");
        cy.get('.MuiAvatar-root').click()
        cy.get('a > .MuiButtonBase-root').click()
        cy.get('body').click()
      cy.get('.newChallengeFormButtons > .MuiButton-containedPrimary').click()
      cy.get('.newChallengeFormDisplayErrors').children().should("have.length", 10);
    });

    it("cant send wrong data ", () => {
        cy.server()
        cy.route("**/api/v1/types", "fixture:types.json");
        cy.visit("http://localhost:3000");
        cy.get('.MuiAvatar-root').click()
        cy.get('a > .MuiButtonBase-root').click()
        cy.get('body').click()
        cy.get('#name').type('שלום עולם')
        cy.get('#repo').type('suvelocity/f4s-course')//private repo
        cy.get('[rows="6"]').type('abc')
        cy.get('#types').click()
        cy.get('#menu- > .MuiPaper-root > .MuiList-root > [tabindex="0"]').click()
        cy.get('.newChallengeFormButtons > .MuiButton-containedPrimary').click()
        cy.get('.newChallengeFormDisplayErrors').children().should("have.length", 8);
      });

      it("can send form with valid data", () => {
        cy.server()
        cy.route("**/api/v1/types", "fixture:types.json");
        cy.route("**/api/v1/challenges/public_repo?repo_name=suvelocity/drag-n-scale", 'public');
        cy.route('post',"**/api/v1/challenges", {id:5}) ;
        cy.route('post', "**/api/v1/image", 'success') ;
        cy.visit("http://localhost:3000");
        cy.get('.MuiAvatar-root').click()
        cy.get('a > .MuiButtonBase-root').click()
        cy.get('body').click()
        cy.get('#name').type('Drag n Scale')
        cy.get('#repo').type('suvelocity/drag-n-scale')//public repo
        cy.get('[rows="6"]').type('Show your dominance in front end vanilla JavaScript by creating a movable scaleable object!')
        cy.get('.dropzone').attachFile("testImg.png", { subjectType: 'drag-n-drop' });
        cy.get('#types').click()
        cy.get('#menu- > .MuiPaper-root > .MuiList-root > [tabindex="0"]').click()
        cy.get('.newChallengeFormButtons > .MuiButton-containedPrimary').click()
        cy.get('#swal2-title').contains("Your challenge was added successfuly!");
      });
  });