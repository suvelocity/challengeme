/// <reference types="cypress" />

describe('CI- test works properly', () => {
  // https://on.cypress.io/interacting-with-elements

  it('cypress Can run on his example', () => {
    cy.visit('https://example.cypress.io/commands/actions');
    // https://on.cypress.io/type
    cy.get('.action-email')
      .type('fake@email.com')
      .should('have.value', 'fake@email.com');
  });

  it('cypress wait on react app and get the login page', () => {
    cy.visit('http://localhost:3000/');
    cy.get('.MuiButton-label').should('be.visible');
  });
});
