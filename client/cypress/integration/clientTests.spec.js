describe("Client Tests", {
  // retries: {
  //   runMode: 3,
  //   openMode: 2
  // }
}, () => {
  it("can get challenges", () => {
    cy.server();
    cy.fixture('../fixtures/homeFixtures/challenges').as('challengesJson');
    cy.route("**/api/v1/challenges", "fixture:challengesJson");
    cy.visit("http://localhost:3000");
    cy.get("div#challenges").should("have.length", 3);
    // cy.route('**/api/v1/challenges', '@challenges')
  });

  it("Check NavBar Links", () => {
    cy.visit("http://localhost:3000/statistics");
    const insights = cy.get("#Insights").click();
    cy.url().should("include", "insights");
    cy.get("#UserStatistics").click();
    cy.url().should("include", "users");
    cy.get("#TeamStatistics").click();
    cy.url().should("include", "teams");
    cy.get("#ChallengeCard").click();
    cy.url().should("include", "challenge-card");
    cy.get("#ProfileStatistics").click();
    cy.url().should("include", "profile");
    cy.get("#home").click();
    cy.url().should("include", "http://localhost:3000/statistics");
  });

  it("Checks home page charts", () => {
    cy.server();
    cy.fixture('../fixtures/homeFixtures/challenges').as('challengesJson');
    cy.fixture('../fixtures/homeFixtures/users').as('usersJson');
    cy.fixture('../fixtures/homeFixtures/topTeams').as('topTeamsJson');
    cy.route("**/top-users", "fixture:usersJson").as("getUsers");
    cy.route("**/teams/top", "fixture:topTeamsJson").as("getTeams");
    cy.route("**/top-challenges", "fixture:topChallenges.json").as("topChallenges");
    cy.visit("http://localhost:3000/statistics");
    cy.get("#topChallenges > .chart > .chartjs-render-monitor");
    cy.get(
      "#topChallenges > .MuiBottomNavigation-root > :nth-child(2)"
    ).click();
    cy.get(".chart > :nth-child(1) > .chartjs-render-monitor");
    cy.get("#TopUsers > .chart > .chartjs-render-monitor");
    cy.get(
      "#TopUsers > .MuiBottomNavigation-root > :nth-child(2) > .MuiBottomNavigationAction-wrapper"
    ).click();
    cy.get("#TopUsers > .chart > :nth-child(1) > .chartjs-render-monitor");
    cy.get("#topTeams > .chart > .chartjs-render-monitor");
    cy.get(
      "#topTeams > .MuiBottomNavigation-root > :nth-child(2) > .MuiBottomNavigationAction-wrapper"
    ).click();
    cy.get(
      "#topTeams > .chart > :nth-child(1) > .chartjs-render-monitor"
    );
  });
});
