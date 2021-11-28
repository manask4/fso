// ***********************************************
// This example commands.js shows you how to
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

Cypress.Commands.add("createBlog", ({ title, author, url }) => {
  cy.wait(200);
  cy.contains("Create new").click();
  cy.get("#title").type(title);
  cy.get("#author").type(author);
  cy.get("#url").type(url);
  cy.get(".create-new-blog-btn").click();
});

Cypress.Commands.add("likeBlog", ({ title }) => {
  cy.wait(200);
  cy.contains(title).parent().parent().as("blogContainer");
  cy.get("@blogContainer").contains(title);
  cy.get("@blogContainer").contains("View").click();
  cy.get("@blogContainer").contains("Like").click();
  cy.get("@blogContainer").contains("Hide").click();
});
