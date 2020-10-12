
const expectedDescription = "dcnlkdncdkncdkacndkcndkjcndakcndkwcndkncdkncdkncdk..."

describe("Home page Tests", () => {
    before(()=>{
      cy.login()
    })
    it("can get challenges", () => {
      cy.server();
      cy.route("**/api/v1/challenges", "fixture:challenges.json");
      cy.route("**/api/v1/challenges/labels", "fixture:labels.json");
      cy.route("**/api/v1/challenges?labels=", "fixture:labelsToChallenges.json");
      cy.route("**/api/v1/image?id=7", "fixture:image7.json");
      cy.visit("http://localhost:3000");
      cy.get("div.challenge-card").should("have.length", 6);
    });
  
    it("Check Theme Toggle", () => {
      cy.visit("http://localhost:3000");      
      if(cy.get("div.dark")){
        cy.get('.MuiAvatar-root').click()
        cy.get(':nth-child(2) > g > path').click()
        cy.get("div.dark").should('not.exist')
      }else{
        cy.get('.MuiAvatar-root').click()
        cy.get(':nth-child(2) > g > path').click()
        cy.get("div.dark").should('exist')
      }
    });
  
    it("Checks challenge cards", () => {
      cy.server();
      cy.route("**/api/v1/challenges", "fixture:challenges.json");
      cy.route("**/api/v1/challenges/labels", "fixture:labels.json");
      cy.route("**/api/v1/challenges?labels=", "fixture:labelsToChallenges.json");
      cy.route("**/api/v1/image?id=7", "fixture:image7.json");
      cy.visit("http://localhost:3000");
      cy.get(':nth-child(5) > .challenge-card-creator-homepage > .avatar-and-repo-name > .MuiAvatar-root').invoke('text').should("eq","Sh")
      cy.get(':nth-child(5) > .challenge-card-description-homepage').invoke('text').should("eq",expectedDescription)
      

    });
  });