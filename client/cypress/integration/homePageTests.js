const expectedDescription = "https://github.com/suvelocity/Authentication-Challenge-TEMPLATE"

describe("Home page Tests", () => {

    it("Can get challenges", () => {
      cy.server()
      cy.setCookie("accessToken","21323213213")
      cy.setCookie("name","shahar")
      cy.route("GET", "**/api/v1/auth/validateToken", { valid : true })    
      cy.route("**/api/v1/challenges", "fixture:challenges.json");
      cy.route("**/api/v1/labels", "fixture:labels.json");
      cy.route("**/api/v1/challenges?labels=", "fixture:labelsToChallenges.json");
      cy.route("**/api/v1/image?id=7", "fixture:image7.json");
      cy.visit('http://localhost:3000');
      cy.get("div.challenge-card").should("have.length", 6);
    });

    it("Check Theme Toggle", () => {
      cy.server()
      cy.setCookie("accessToken","21323213213")
      cy.setCookie("name","shahar")
      cy.route("GET", "**/api/v1/auth/validateToken", { valid : true })  
      if(window.matchMedia('(prefers-color-scheme: dark)').matches){
        cy.get('.MuiToolbar-root > .MuiAvatar-root').click()
        cy.get(':nth-child(2) > g > path').click()
        cy.get("div.dark").should('not.exist') 
      }  
      else{
        (cy.get("div .dark").should("not.exist")) 
        cy.get('.MuiToolbar-root > .MuiAvatar-root').click()
        cy.get(':nth-child(2) > g > path').click()
        cy.get("div.dark").should('exist')
      } 
    });
  
    it("Checks challenge cards", () => {
      cy.server();
      cy.setCookie("accessToken","21323213213")
      cy.setCookie("name","shahar")
      cy.route("GET", "**/api/v1/auth/validateToken", { valid : true })    
      cy.route("**/api/v1/challenges", "fixture:challenges.json");
      cy.route("**/api/v1/labels", "fixture:labels.json");
      cy.route("**/api/v1/challenges?labels=", "fixture:labelsToChallenges.json");
      cy.route("**/api/v1/image?id=7", "fixture:image7.json");
      cy.visit("http://localhost:3000");
      cy.get(':nth-child(1) > .challenge-card-creator-homepage > .avatar-and-repo-name > .MuiAvatar-root').invoke('text').should("eq","su")
      cy.get(':nth-child(1) > .challenge-card-description-homepage').invoke('text').should("eq",expectedDescription)
    });

    it("Can filter by labels", () => {
      cy.server();
      cy.setCookie("accessToken","21323213213")
      cy.setCookie("name","shahar")
      cy.route("GET", "**/api/v1/auth/validateToken", { valid : true })    
      cy.route("**/api/v1/challenges", "fixture:challenges.json");
      cy.route("**/api/v1/labels", "fixture:labels.json");
      cy.route("**/api/v1/challenges?labels=", "fixture:labelsToChallenges.json");
      cy.route("**/api/v1/challenges?labels=1", "fixture:filteredChallenges.json");
      cy.route("**/api/v1/image?id=7", "fixture:image7.json");
      cy.visit("http://localhost:3000");
      cy.get('.home-page > .filterMenu > .toggleOpen').click();
      cy.get('.open > :nth-child(2) > .labelFilter > .selectLabels > .css-yk16xz-control > .css-g1d714-ValueContainer').click();
      cy.get('#react-select-3-option-0').click();
      cy.get('.open > :nth-child(2) > .buttons > .filterSubmit').click();
      cy.get('.challenge-card').should('have.length', 2);
      
    });
  });