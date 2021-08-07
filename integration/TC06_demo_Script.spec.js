const { it } = require("mocha")

describe('Remove all articles', () => {
    before(function () {
        cy.signIn()
    })

    it('Delete existing article', () =>{
        cy.gotoProfile()
        //Click on Favourite icon
        cy.get('.ion-heart').first().click()
    })

    it('Remove',()=>{
        //Click on Favourited articles page and verify existence of favourited item 
        cy.get('.preview-link').first().click()
        cy.url().should('include','article')
        //cy.get('h1',).should('include','Nocturnal habits of Tasmanian wombats')
        //cy.contains('The wombats from Tasmania have a very peculiar habits when the sun goes down.').should('be.visible')
        cy.get('.btn-outline-danger').contains('Delete Article').click()
        //cy.contains('Your feed').should('be.visible')
        //cy.get('.btn[type="submit"]').contains('Post Comment')
    })
})