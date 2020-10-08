describe('My First Test', () => {
    it('Does not do much!', () => {
      expect(true).to.equal(true)
    })
    it('Does not do much 2!', () => {
      expect(1).to.equal(1)
    })
  })
  describe('The Statics Page', () => {
    it('successfully loads', () => {
      cy.visit('http://localhost:3000/statistics') // change URL to match your dev URL
    })
  })

  describe('Client Tests', () => {
    it('Check NavBar Links', () => {
      cy.visit('http://localhost:3000/statistics')
      const insights = cy.get('#Insights').click()
      cy.url().should('include', 'insights')
      cy.get('#UserStatistics').click()
      cy.url().should('include', 'users')
      cy.get('#TeamStatistics').click()
      cy.url().should('include', 'teams')
      cy.get('#ChallengeCard').click()
      cy.url().should('include', 'challenge-card')
      cy.get('#ProfileStatistics').click()
      cy.url().should('include', 'profile')
      cy.get('#home').click()
      cy.url().should('include', 'http://localhost:3000/statistics')
    })
  })