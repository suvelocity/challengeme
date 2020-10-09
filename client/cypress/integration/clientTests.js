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

    // it('Checks home page charts', () => {
    //   cy.visit('http://localhost:3000/statistics');
    //   cy.server()
    //   cy.route('**/top-users', 'fixture:users.json').as('getUsers')
    //   cy.get('.makeStyles-chart-36')
    //   cy.get('.makeStyles-chart-36 > .MuiBottomNavigation-root > :nth-child(2)').click()
    //   cy.get('.makeStyles-chart-42')
    //   cy.get('.makeStyles-chart-38')
    //   cy.get('.makeStyles-chart-38 > .MuiBottomNavigation-root > :nth-child(2)').click()
    //   cy.get('.makeStyles-chart-44')
    //   cy.get('.chart > .chartjs-render-monitor')
    //   cy.get('.makeStyles-chart-40 > .MuiBottomNavigation-root > :nth-child(2)').click()
    //   cy.get('.makeStyles-chart-46 > .chart > :nth-child(1) > .chartjs-render-monitor')
    // })




  })