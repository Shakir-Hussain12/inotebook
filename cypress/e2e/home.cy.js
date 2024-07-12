/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Home Page tests', () => {
  beforeEach(() => {
    cy.visit('/auth');
    cy.login('dummyUser@gmail.com', '123456');
  });

  it('redirects to Home Page upon successful login', () => {
    cy.url().should('include', '/');
    cy.contains('My Notes').should('exist');
  });

  it('displays loader when fetching notes', () => {
    cy.intercept('GET', 'http://localhost:5000/api/notes', {
      statusCode: 200,
      body: [],
      delay: 1000,
    }).as('mockGetResponse');

    cy.get('[data-testid="loader"]').should('exist');
    cy.wait('@mockGetResponse');
    cy.get('[data-testid="loader"]').should('not.exist');
  });

  it('displays the notes on the home page', () => {
    cy.intercept('GET', 'http://localhost:5000/api/notes', {
      statusCode: 200,
      body: [
        {
          title: 'First Note',
          description: 'This is the first note',
        },
        {
          title: 'Second Note',
          description: 'This is the second note',
        },
      ],
    }).as('mockGetResponse');

    cy.wait('@mockGetResponse').then((interceptor) => {
      expect(interceptor.response.statusCode).to.eq(200);
      expect(interceptor.response.body).to.have.length(2);
    });

    cy.get('[value="First Note"]').should('exist');
    cy.get('[value="Second Note"]').should('exist');
  });
});
