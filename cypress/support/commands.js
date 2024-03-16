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

require("@testing-library/cypress/add-commands")

Cypress.Commands.add("addTitle", function (text) {
    cy.contains("Chart title").type(text)
})

Cypress.Commands.add("addXlabel", function (text) {
    cy.contains("X label").type(text)
})

Cypress.Commands.add("addYlabel", function (text) {
    cy.contains("Y label").type(text)
})

Cypress.Commands.add("addvalues", function (text1, text2, setIndex) {
    cy.get('.x-value-input').eq(setIndex).type(text1); // Selects the X input in the specified set
    cy.get('.y-value-input').eq(setIndex).type(text2); // Selects the Y input in the specified set
})