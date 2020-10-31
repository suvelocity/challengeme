const mockChallenge = require('../../fixtures/challengeFixtures/challenge1.json');
const submissions = require('../../fixtures/challengeFixtures/submissions.json');
const reviews = require('../../fixtures/challengeFixtures/review1.json');
const submitModal = {
    header: 'Submit Your Solution',
    rating: 'Rate this challenge',
    review: {
      header: 'Please leave your review here',
      title: 'Title',
      message: 'Message',
    }
};

describe('Single Challenge Page - Test suite' , () => {
  
  beforeEach(() => {

    cy.login();

    cy.server();
    cy.route(`/api/v1/challenges`, 'fixture:challengeFixtures/challenges.json');
    cy.route(`/api/v1/challenges/1`, mockChallenge);
    cy.route(`/api/v1/reviews/byChallenge/1`, reviews);
    cy.route(`POST`, `/api/v1/auth/token`, {'message': 'token updated'})
    cy.route('POST', `/api/v1/challenges/1/apply`, 'Success');
    cy.route(`/api/v1/challenges/1/shaharEliyahu/submission`, '')
    
   
    cy.visit('http://localhost:3000/challenges/1');
  });

  it('The page includes all the mandatory data about the challenge', () => {

    cy.get('[cy-test="challenge-name"]').contains(mockChallenge.name);
    cy.get('[cy-test="challenge-description"]').contains(mockChallenge.description);
    cy.get('[cy-test="challenge-createdBy"]').contains(mockChallenge.Author.userName);
    
    cy.get('[cy-test="challenge-createdAt"]').contains(
      mockChallenge.createdAt.split('T')[0]
      );

      
      mockChallenge.Labels.forEach((label) => {
        cy.get(`[cy-test="challenge-label-${label.name}"]`).contains(label.name);
      });

      cy.get(`[cy-test="challenge-boilerPlate"]`).should('have.attr', 'target', '_blank');

    });
  
  it('There is a submmit button, that opens a modal', () => {
      
    cy.route(`**/api/v1/challenges/1/shaharEliyahu/submission`, '');

    cy.get('[cy-test="submit-button"]').click()

    cy.contains(submitModal.header);
    cy.contains(submitModal.rating);
    cy.contains(submitModal.review.header);
    cy.contains(submitModal.review.title);
    cy.contains(submitModal.review.message);

  });

  
  it('Form validation, cannot send without required inputs', () => {

    cy.route(`**/api/v1/challenges/1/shaharEliyahu/submission`, '');

    cy.get('[cy-test="submit-button"]').click()
    cy.get('[cy-test="submit-review-button"]').click()
  
    cy.contains("Please enter a solution repository");
    cy.contains("Please rate this challenge");

    cy.get('[cy-test="submit-rating-input"]').click();

    cy.get('[cy-test="submit-repo-input"]')
      .type("https://github.com/suvelocity/f4s-course");

    cy.get('[cy-test="submit-review-button"]').click();
    cy.contains(`Repository's Link is not valid`)

    cy.get('[cy-test="submit-repo-input"]')
      .type("bad input");

    cy.get('[cy-test="submit-review-button"]').click();
    cy.contains('The text should look like "username/repository-name')


  });
  
  it('Sends valid answer form', () => {

    cy.route(`/api/v1/challenges/1/shaharEliyahu/submission`, '');
    
    cy.get('[cy-test="submit-button"]').click()

    cy.get('[cy-test="submit-repo-input"]')
      .type("suvelocity/f4s-course")

    cy.get('[cy-test="submit-rating-input"]').click();

    cy.get('[cy-test="submit-title-input"]')
      .type('title')

    cy.get('[cy-test="submit-content-input"]')
      .type('content')

    cy.route(`/api/v1/services/public_repo?repo_name=suvelocity/f4s-course`, ''); 

    cy.get('[cy-test="submit-review-button"]').click();
    cy.get('[cy-test="submit-review-button"]').should('not.exist');

  });

  it('Submissions handler', () => {

    cy.route(`/api/v1/challenges/1/shaharEliyahu/submission`, submissions[0]).as('pending');
    
    cy.wait('@pending').then(() => {
      cy.get('[cy-test="pending-submission"]').contains("Your submission is being tested");
    });

    cy.route(`/api/v1/challenges/1/shaharEliyahu/submission`, submissions[1]).as('fail');

    cy.wait('@fail').then(() => {
      cy.get('[cy-test="fail-submission"]').contains(submissions[1].state);
      cy.get('[cy-test="fail-submission"]').contains(submissions[1].updatedAt.split('T')[0]);
      cy.get('[cy-test="submit-again-button"]').contains('Submit again');
    })
    
    cy.route(`/api/v1/challenges/1/shaharEliyahu/submission`, submissions[2]).as('success');

    cy.wait('@success').then(() => {
      cy.get('[cy-test="success-submission"]').contains(submissions[2].state);
      cy.get('[cy-test="success-submission"]').contains(submissions[2].updatedAt.split('T')[0]);
      cy.get('[cy-test="submit-again-button"]').contains('Submit again');
    })
  });
   
  it('Reviews has title, content, date and the name of the user who posted the review', () => {

    cy.get('[cy-test="challenge-reviews"]').find('[cy-test="challenge-single-review"]').should('have.length', reviews.length)

    reviews.forEach((review) => {
      cy.get('[cy-test="review-title"]').contains(review.title);
      cy.get('[cy-test="review-content"]').contains(review.content);
      cy.get('[cy-test="review-author"]').contains(review.User.userName);
      cy.get('[cy-test="review-createdAt"]')
      cy.get('[cy-test="review-rating"]')
    });
  });
  
});

