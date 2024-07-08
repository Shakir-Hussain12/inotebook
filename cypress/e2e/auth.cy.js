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
    cy.get('[name=toggleButton]').click();
    cy.get('[data-testid="first-name"]').type('John');
    cy.get('[data-testid="last-name"]').type('Cena');
    cy.get('[data-testid="email"]').type('johndoe@gmail.com');
    cy.get('[data-testid="password"]').type('123456');
    cy.get('[name=submitButton]').click();
  });

});
