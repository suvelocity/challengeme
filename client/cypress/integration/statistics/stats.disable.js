describe.skip('Client Tests', () => {
  beforeEach(() => {
    cy.login();
  });

  // Navbar
  it('Check NavBar Links', () => {
    cy.visit('http://localhost:3000');
    cy.get('#statistics').click();
    const insights = cy.get('#Insights').click();
    cy.url().should('include', 'insights');

    cy.get('#UserStatistics').click();
    cy.url().should('include', 'users');

    cy.get('#TeamStatistics').click();
    cy.url().should('include', 'teams');

    cy.get('#home').click();
    cy.url().should('include', 'http://localhost:3000/statistics');
  });

  // Home Page
  it('Checks home page charts', () => {
    cy.server();

    cy.route('**/users/top-users', 'fixture:homeFixtures/users.json').as(
      'getUsers',
    );
    cy.route('**/teams/top', 'fixture:homeFixtures/topTeams.json').as(
      'getTeams',
    );
    cy.route(
      '**/insights/top-challenges',
      'fixture:homeFixtures/topChallenges.json',
    ).as('getTopChallenges');

    cy.visit('http://localhost:3000/statistics');
    cy.get('#topChallenges');
    cy.get('#topChallengesPie').click();
    cy.get('#topChallengesBar').click();

    cy.get('#topUsers');
    cy.get('#topUsersPie').click();
    cy.get('#topUsersBar').click();

    cy.get('#topTeams');
    cy.get('#topTeamsPie').click();
    cy.get('#topTeamsBar').click();
  });

  // Insights
  it('Checks insights page charts', () => {
    cy.server();

    cy.route(
      '**/challenges-by-reviews',
      'fixture:insightsFixtures/challengesByReview.json',
    ).as('getChallengesByReview');
    cy.route(
      '**/challenges-category',
      'fixture:insightsFixtures/challengesCategory.json',
    ).as('getChallengesCategory');
    cy.route('**/sub-by-date', 'fixture:insightsFixtures/subByDate.json').as(
      'getSubByDate',
    );
    cy.route(
      '**/top-challenges',
      'fixture:insightsFixtures/topChallenges.json',
    ).as('getTopChallenges');
    cy.route('**/top-success', 'fixture:insightsFixtures/topSuccess.json').as(
      'getTopSuccess',
    );

    cy.visit('http://localhost:3000/statistics/insights');

    cy.get('#SubmissionTotalChart');
    cy.get('#challengesMostSuccessChart');
    cy.get('#challengesMostSubChart');

    cy.get('#challengesByTypeChart');
    cy.get('#challengesByTypeChartPie').click();
    cy.get('#challengesByTypeChartBar').click();

    cy.get('#topByReview');
    cy.get('#topByReviewPie').click();
    cy.get('#topByReviewBar').click();

    cy.get('#subByDate');
    cy.get('#subByDatePie').click();
    cy.get('#subByDateBar').click();
  });

  // Users
  it('Checks users page charts', () => {
    cy.server();

    cy.route(
      '**/unsolved-challenges',
      'fixture:usersFixtures/unsolvedChallenges.json',
    ).as('getUnsolvedChallenges');
    cy.route('**/user-success', 'fixture:usersFixtures/userSuccess.json').as(
      'getUserSuccess',
    );
    cy.route('**/sub-by-type', 'fixture:usersFixtures/subByCategory.json').as(
      'getSubByCategory',
    );
    cy.route('**/sub-by-date', 'fixture:usersFixtures/subByDate.json').as(
      'getSubByDate',
    );

    cy.visit('http://localhost:3000/statistics/users');

    cy.get('#UserTopSubmissionsByType');
    cy.get('#UserTopSubmissionsByTypePie').click();
    cy.get('#UserTopSubmissionsByTypeBar').click();

    cy.get('#topUsersBySuccess');
    cy.get('#topUsersBySuccessPie').click();
    cy.get('#topUsersBySuccessBar').click();

    cy.get('#UserSubmissionsByDate');
    cy.get('#UserSubmissionsByDatePie').click();
    cy.get('#UserSubmissionsByDateLine').click();
    cy.get('#UserSubmissionsByDateBar').click();

    cy.get('#topUsersByTeam');
  });

  // Teams
  it('Checks teams page charts', () => {
    cy.server();

    cy.route(
      '**/team-submissions',
      'fixture:teamsFixtures/teamSubmissions.json',
    ).as('getTeamSubmissions');
    cy.route(
      '**/last-week-submissions',
      'fixture:teamsFixtures/lastWeekSubmissions.json',
    ).as('getLastWeekSubmissions');
    cy.route(
      '**/success-challenge',
      'fixture:teamsFixtures/successChallenge.json',
    ).as('getSuccessChallenge');

    cy.visit('http://localhost:3000/statistics/teams');

    cy.get('#lastWeekSubOfTeam');
    cy.get('#lastWeekSubOfTeamPie').click();
    cy.get('#lastWeekSubOfTeamBar').click();

    cy.get('#TopOfTheTeams');
    cy.get('#TopOfTheTeamsPie').click();
    cy.get('#TopOfTheTeamsBar').click();

    cy.get('#TopSuccessChallenges');
    cy.get('#TopOfTheTeamsPie').click();
    cy.get('#TopOfTheTeamsBar').click();

    cy.get('#TopOfTheTeams');
    cy.get('#TopSuccessChallengesPie').click();
    cy.get('#TopSuccessChallengesBar').click();
  });
});
