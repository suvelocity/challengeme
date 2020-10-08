describe('Client Tests', () => {
    
    it('successfully loads', () => {
        cy.visit('http://localhost:3000/statistics') // change URL to match your dev URL
      })

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