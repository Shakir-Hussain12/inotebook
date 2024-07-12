/* eslint-disable no-undef */
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands

Cypress.Commands.add('login', (email, password) => {
  cy.intercept('POST', 'http://localhost:5000/api/auth/login', {
    statusCode: 200,
    body: { message: 'Logged In Successfully' },
  }).as('mockPostResponse');

  cy.get('[data-testid="email"]').type(email);
  cy.get('[data-testid="password"]').type(password);
  cy.get('[name=submitButton]').click();

  cy.wait('@mockPostResponse');
});
