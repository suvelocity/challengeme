describe("Search Tests", () => {
    before(()=>{
        cy.login()
    })
    it("Can search with labels", () => {
        const typedText = 'react';
        cy.server();
        cy.route("**/api/v1/challenges?challengeName=react&labels=1", "fixture:search.json");
        cy.route("**/api/v1/challenges/labels", "fixture:labels.json");
        cy.route("**/api/v1/challenges?labels=", "fixture:labelsToChallenges.json");
        cy.visit("http://localhost:3000");
        cy.get('#searchResults').should('have.class','closed');
        cy.get('#searchBar').click();
        cy.get('#searchResults').should('have.class','open');
        cy.get('#seperator > .filterMenu > .toggleOpen').click();
        cy.get('.open > :nth-child(2) > .labelFilter > .selectLabels > .css-yk16xz-control > .css-g1d714-ValueContainer').click();
        cy.get('#react-select-2-option-0').click();
        cy.get('.open > :nth-child(2) > .buttons > .filterSubmit').click();
        cy.get('#searchBar')
            .type(typedText);
        cy.get("div.SearchTicket").should("have.length", 1);
        cy.get('.searchClose').click();
        cy.get('#searchResults').should('have.class','closed');
    });

})