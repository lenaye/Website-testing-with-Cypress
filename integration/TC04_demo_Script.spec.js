//This test demonstrates the following:- 
// 1 - use of custom commands using the commands.js file.
// 2 - implementing mocha's setup feature 'before' as a way of running initial setup script.

describe('Sign in using Custom Commands', () => {
    before(function () {
        cy.signIn()
    })

    it('Create a new post', () => {
        cy.contains('New Post')
            .should('be.visible')
            .click()
        //3 different ways to verify URL path
        cy.url().should('include','/editor')
        cy.hash().should('include','#/editor')
        cy.location('hash').should('include','#/editor')

        //Enter post details
        cy.get('input[placeholder="Article Title"]')
            .type('Nocturnal habits of Tasmanian wombats')
        cy.get('input[placeholder="What\'s this article about?"]')
            .type('Brief summary of the article')
        cy.get('textarea[placeholder="Write your article (in markdown)"]')
            .type('The wombats from Tasmania have a very peculiar habits when the sun goes down.')
        //Find a button class with matching text and click on it
        cy.get('.btn').contains('Publish Article').click()

        //Verify published page
        cy.url().should('include','/article')
        cy.contains('Nocturnal habits of Tasmanian wombats').should('be.visible')
        cy.get('.author').contains('leonardoa')
        cy.contains('The wombats from Tasmania have a very peculiar habits when the sun goes down.').should('be.visible')
        cy.get('.btn[type="submit"]').contains('Post Comment')
    })    
})