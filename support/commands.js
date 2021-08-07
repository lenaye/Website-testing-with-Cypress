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
Cypress.Commands.add('signIn', ()=>{
    cy.visit('/#/login?_k=9pjjo5')
    //Verify page tile and protocol
    cy.title().should('eq','Conduit')
    cy.location('protocol').should('eq','http:')
    //Submit login details and verify output
    cy.get('input[type="email"]').type('len.aye@nandawon.com')
    cy.get('input[type="password"]').type('test1ng!')
    //Find a button class with matching text and click on it
    cy.get('.btn').contains('Sign in')
        .should('be.visible')
        .click()
    //Wait for new page and verify page content
    cy.contains('Your Feed',{timeout:10000}).should('be.visible')
    //Verify Navigation menus
    cy.contains('Home').should('be.visible')
    cy.contains('Settings').should('be.visible')
    cy.contains('leonardoa').should('be.visible')
    //Verify Text on page after log in
    cy.contains('No articles are here... yet.',{timeout:10000}).should('be.visible')
})

Cypress.Commands.add('gotoProfile', ()=>{
        //Go to Profile page
        cy.get('.nav-link').contains('leonardoa').click()
        //Wait for new page and verify page content
        cy.contains('My Articles',{timeout:10000}).should('be.visible')
})

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
