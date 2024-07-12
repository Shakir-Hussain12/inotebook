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

  it('adds a new note on the home page', () => {
    cy.intercept('GET', 'http://localhost:5000/api/notes', {
      statusCode: 200,
      body: [],
    }).as('mockGetResponse');

    cy.intercept('POST', 'http://localhost:5000/api/notes', {
      statusCode: 201,
      body: {
        note: {
          tag: 'Work',
          title: 'New Note',
          description: 'This is the new note',
        },
      },
    }).as('mockPostResponse');

    cy.wait('@mockGetResponse');

    cy.get('[name="addNote"]').click();
    cy.get('#Tag').select('Work');
    cy.get('[data-testid="title"]').type('New Note');
    cy.get('[data-testid="description"]').type('This is the new note');
    cy.get('[name="saveFormButton"]').click();

    cy.wait('@mockPostResponse').then((interceptor) => {
      expect(interceptor.response.statusCode).to.eq(201);
    });

    cy.get('[value="New Note"]').should('exist');
    cy.contains('This is the new note').should('exist');
  });

  it('goes back to home page without adding a note upon cancelling', () => {
    cy.intercept('GET', 'http://localhost:5000/api/notes', {
      statusCode: 200,
      body: [],
    }).as('mockGetResponse');

    cy.wait('@mockGetResponse');

    cy.get('[name="addNote"]').click();
    cy.get('[name="cancelButton"]').click();

    cy.get('[name="addNote"]').should('exist');
    cy.get('[data-testid="noteItem"]').should('not.exist');
  });
});
