const handleGithubTokens = require('../../helpers/handleGithubTokens') 


describe("challenge route", () => {
    beforeEach(() => {
        cy.fixture('gitHub.json').as('tokenHeaders')
        handleGithubTokens('@tokenHeaders')
        cy.generateToken()
    })
    it("can start server", () => {
        cy.request("http://localhost:8080/").then(response => {
            expect(response.body).to.have.property('name', 'Jane')
        })
    })
})
