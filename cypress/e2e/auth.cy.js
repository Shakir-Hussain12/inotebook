/// <reference types="cypress" />

describe('Authentication tests', () => {
  beforeEach(() => {
    cy.visit('/auth');
  });

  it('changes data fields when you click on register', () => {
    cy.get('[name=toggleButton]').click();
    cy.contains('First Name').should('exist');
    cy.contains('Last Name').should('exist');
    cy.get('[name=toggleButton]').contains('Login').should('exist');
  });

  it('redirects to login upon successful registration', () => {
    cy.intercept('GET', 'http://localhost:5000/api/auth/', {
      statusCode: 200,
      body: [],
    }).as('mockGetResponse');

    cy.intercept('POST', 'http://localhost:5000/api/auth/createuser', {
      statusCode: 200,
      body: { message: 'User created' },
    }).as('mockPostResponse');

    cy.get('[name=toggleButton]').click();
    cy.get('[data-testid="first-name"]').type('John');
    cy.get('[data-testid="last-name"]').type('Cena');
    cy.get('[data-testid="email"]').type('johndoe@gmail.com');
    cy.get('[data-testid="password"]').type('123456');
    cy.get('[name=submitButton]').click();

    cy.wait(['@mockGetResponse', '@mockPostResponse']).then(([getInterceptor, postInterceptor]) => {
      expect(getInterceptor.response.statusCode).to.eq(200);

      expect(postInterceptor.response.statusCode).to.eq(200);
      expect(postInterceptor.response.body).to.have.property('message', 'User created');
    });

    cy.get('[name=submitButton]').contains('Login').should('exist');
  });

});
