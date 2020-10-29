
describe("challenge route", () => {
    beforeEach(() => {
        cy.fixture('users.json').as('usersData')
        cy.generateToken('@usersData[0]')
        cy.log(message)
    })
    it("can start server", () => {
        cy.request("http://localhost:8080").then(response => {
            expect(response.body).to.have.property('name', 'Jane')
        })
    })
})