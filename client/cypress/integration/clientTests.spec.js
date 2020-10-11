describe("Client Tests", () => {
  before(() => {
    cy.login()
  })
  it("can get challenges", () => {
    cy.server();
    cy.route("**/api/v1/challenges", "fixture:homeFixtures/challenges");
    cy.visit("http://localhost:3000");
    cy.get("div#challenges").should("have.length", 3);
    // cy.route('**/api/v1/challenges', '@challenges')
  });


  // Navbar
  it("Check NavBar Links", () => {
    cy.visit("http://localhost:3000/statistics");
    const insights = cy.get("#Insights").click();
    cy.url().should("include", "insights");

    cy.get("#UserStatistics").click();
    cy.url().should("include", "users");

    cy.get("#TeamStatistics").click();
    cy.url().should("include", "teams");

    cy.get("#home").click();
    cy.url().should("include", "http://localhost:3000/statistics");
  });

  // Home Page
  it("Checks home page charts", () => {
    cy.server();

    cy.route("**/top-users", "fixture:homeFixtures/users.json").as("getUsers");
    cy.route("**/teams/top", "fixture:homeFixtures/topTeams.json").as("getTeams");
    cy.route("**/top-challenges", "fixture:homeFixtures/topChallenges.json").as("topChallenges");

    cy.visit("http://localhost:3000/statistics");

    cy.get("#topChallenges > .chart > .chartjs-render-monitor");
    cy.get(
      "#topChallenges > .MuiBottomNavigation-root > :nth-child(2)"
    ).click();
    cy.get(
      "#topChallenges > .MuiBottomNavigation-root > :nth-child(1)"
    ).click();

    cy.get("#TopUsers > .chart > .chartjs-render-monitor");
    cy.get(
      "#TopUsers > .MuiBottomNavigation-root > :nth-child(2)"
    ).click();
    cy.get(
      "#TopUsers > .MuiBottomNavigation-root > :nth-child(1)"
    ).click();
    
    cy.get("#topTeams > .chart > .chartjs-render-monitor");
    cy.get(
      "#topTeams > > .MuiBottomNavigation-root > :nth-child(2)"
    ).click();
    cy.get(
      "#topTeams > > .MuiBottomNavigation-root > :nth-child(1)"
    ).click();
  });

  //Insights
  it("Checks insights page charts", () => {
    cy.server();

    cy.route("**/challenges-by-reviews", "fixture:insightsFixtures/challengesByReview.json").as("getChallengesByReview");
    cy.route("**/challenges-category", "fixture:insightsFixtures/challengesCategory.json").as("getChallengesCategory");
    cy.route("**/sub-by-date", "fixture:insightsFixtures/subByDate.json").as("getSubByDate");
    cy.route("**/top-challenges", "fixture:insightsFixtures/topChallenges.json").as("getTopChallenges");
    cy.route("**/top-success", "fixture:insightsFixtures/topSuccess.json").as("getTopSuccess");
    
    cy.visit("http://localhost:3000/statistics/insights");
    
    cy.get("#SubmissionTotalChart");

    cy.get("#challengesMostSuccessChart");
    cy.get("#challengesMostSubChart");

    cy.get("#challengesByTypeChart");
    cy.get(
      "#challengesByTypeChart > .MuiBottomNavigation-root > :nth-child(2)"
    ).click();
    cy.get(
      "#challengesByTypeChart > .MuiBottomNavigation-root > :nth-child(1)"
    ).click();

    cy.get("#topByReview");
    cy.get(
      "#topByReview > .MuiBottomNavigation-root > :nth-child(2)"
    ).click();
    cy.get(
      "#topByReview > .MuiBottomNavigation-root > :nth-child(1)"
    ).click();

    cy.get("#subByDate");
    cy.get(
      "#subByDate > .MuiBottomNavigation-root > :nth-child(2)"
    ).click();
    cy.get(
      "#subByDate > .MuiBottomNavigation-root > :nth-child(1)"
    ).click();


  });

  //Users
  it("Checks users page charts", () => {
    cy.server();

    cy.route("**/unsolved-challenges", "fixture:usersFixtures/unsolvedChallenges.json").as("getUnsolvedChallenges");
    cy.route("**/user-success", "fixture:usersFixtures/userSuccess.json").as("getUserSuccess");
    cy.route("**/sub-by-category", "fixture:usersFixtures/subByCategory.json").as("getSubByCategory");
    cy.route("**/sub-by-date", "fixture:usersFixtures/subByDate.json").as("getSubByDate");

    cy.visit("http://localhost:3000/statistics/users");

    cy.get("#UserTopSubmissionsByType");
    cy.get(
      "#UserTopSubmissionsByType > .MuiBottomNavigation-root > :nth-child(2)"
      ).click();
    cy.get(
      "#UserTopSubmissionsByType > .MuiBottomNavigation-root > :nth-child(1)"
      ).click();
    
    cy.get("#topUsersBySuccess > .chart > .chartjs-render-monitor");
    cy.get(
      "#topUsersBySuccess > .MuiBottomNavigation-root > :nth-child(2)"
      ).click();
    cy.get(
      "#topUsersBySuccess > .MuiBottomNavigation-root > :nth-child(1)"
      ).click();
      
    cy.get("#UserSubmissionsByDate > .chart > .chartjs-render-monitor");

    cy.get(
      "#UserSubmissionsByDate > .MuiBottomNavigation-root > :nth-child(3) > .MuiBottomNavigationAction-wrapper"
      ).click();
    cy.get(
      "#UserSubmissionsByDate > .MuiBottomNavigation-root > :nth-child(2) > .MuiBottomNavigationAction-wrapper"
      ).click();
    cy.get(
      "#UserSubmissionsByDate > .MuiBottomNavigation-root > :nth-child(1) > .MuiBottomNavigationAction-wrapper"
      ).click();

    cy.get("#topUsersByTeam");
  });

  //Teams
  it("Checks teams page charts", () => {
    cy.server();

    cy.route("**/team-submissions", "fixture:teamsFixtures/teamSubmissions.json").as("getTeamSubmissions");
    cy.route("**/last-week-submissions", "fixture:teamsFixtures/lastWeekSubmissions.json").as("getLastWeekSubmissions");
    cy.route("**/success-challenge", "fixture:teamsFixtures/successChallenge.json").as("getSuccessChallenge");

    cy.visit("http://localhost:3000/statistics/teams");

    cy.get("#lastWeekSubOfTeam > .chart > .chartjs-render-monitor");
    cy.get(
      "#lastWeekSubOfTeam > .MuiBottomNavigation-root > :nth-child(2) > .MuiBottomNavigationAction-wrapper"
      ).click();
    cy.get(
      "#lastWeekSubOfTeam > .MuiBottomNavigation-root > .MuiButtonBase-root.Mui-selected > .MuiBottomNavigationAction-wrapper"
      ).click();
    
    cy.get("#TopOfTheTeams > .chart > .chartjs-render-monitor");
    cy.get(
      "#TopOfTheTeams > .MuiBottomNavigation-root > .MuiButtonBase-root.Mui-selected > .MuiBottomNavigationAction-wrapper"
      ).click();
    cy.get(
      "#TopOfTheTeams > .MuiBottomNavigation-root > .MuiButtonBase-root.Mui-selected > .MuiBottomNavigationAction-wrapper"
      ).click();

    cy.get("#TopSuccessChallenges > .chart > .chartjs-render-monitor");
    cy.get(
      "#TopOfTheTeams > .MuiBottomNavigation-root > .MuiButtonBase-root.Mui-selected > .MuiBottomNavigationAction-wrapper"
      ).click();
    cy.get(
      "#TopOfTheTeams > .MuiBottomNavigation-root > .MuiButtonBase-root.Mui-selected > .MuiBottomNavigationAction-wrapper"
      ).click();

    cy.get("#TopOfTheTeams > .chart > .chartjs-render-monitor");
    cy.get(
      "#TopSuccessChallenges > .MuiBottomNavigation-root > .MuiButtonBase-root.Mui-selected > .MuiBottomNavigationAction-wrapper"
      ).click();
    cy.get(
      "#TopSuccessChallenges > .MuiBottomNavigation-root > .MuiButtonBase-root.Mui-selected > .MuiBottomNavigationAction-wrapper"
      ).click();
  });
});
