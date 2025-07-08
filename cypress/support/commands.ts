/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

Cypress.Commands.add("login", () => {
  cy.session("user-session", () => {
    // Make sure you're visiting your app (which should use the same key)
    cy.visit("http://localhost:3000/sign-in");

    // These credentials should exist in whatever Clerk instance you're using
    cy.get('input[name="identifier"]').type(Cypress.env("TEST_USER_EMAIL"));

    cy.get('input[name="password"]').type(Cypress.env("TEST_USER_PASSWORD"));

    cy.get('button[type="submit"]').click();
    cy.url().should("not.include", "/sign-in");
  });
});

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
    }
  }
}

export {}; // Ensure this file is treated as a module
