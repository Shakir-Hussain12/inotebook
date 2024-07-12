/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Home Page tests', () => {
  beforeEach(() => {
    cy.visit('/auth');
    cy.login('dummyUser@gmail.com', '123456');
  });
});
