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

  
});
