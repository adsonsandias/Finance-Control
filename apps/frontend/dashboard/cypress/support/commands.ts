// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- This is a parent command --
Cypress.Commands.add("login", (email: string, password: string) => {
  cy.visit("/login");
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

// -- This is a child command --
Cypress.Commands.add(
  "validateFormField",
  (selector: string, value: string, error: string) => {
    cy.get(selector).clear().type(value);
    cy.get('button[type="submit"]').click();
    cy.contains(error).should("be.visible");
  }
);

// -- This is a dual command --
Cypress.Commands.add("checkAccessibility", (path: string) => {
  cy.visit(path);
  cy.injectAxe();
  cy.checkA11y();
});

// Declare global Cypress namespace to add custom commands
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      validateFormField(
        selector: string,
        value: string,
        error: string
      ): Chainable<void>;
      checkAccessibility(path: string): Chainable<void>;
      injectAxe(): Chainable<void>;
      checkA11y(): Chainable<void>;
    }
  }
}

export {};
