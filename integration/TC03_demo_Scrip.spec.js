/*
Test case to highlight some of the key elements of Cypress Web UI Testing.

The website used in this example is a publicly accessible blogger site:  http://react-redux.realworld.io

This demo finds and acts on the following web elememts:
- sidebar
- varied length tags


The demo illuestrates the use of the following methods:

- .within() and .then()
- local variable inside within()

*/


describe('Scenario 2 - Select a popular tag and check selection', () => {
    before(function () {
        cy.signIn()
    })


    it('Select a popular tag', () => {
        //Initially, there will only be 2 sub-headings: Your Feed and Global Feed
        cy.get('.feed-toggle').within( () => {
            cy.get('li').should('have.length',2)
        })

        cy.get('.sidebar').within( () => {
            cy.get(':nth-child(11)').then(($label)=>{
                //store name of tag 
                const tag = $label.text()
                const tagheading = '#'+tag
            cy.get(':nth-child(11)').click()
            //cy.get('.feed-toggle > .nav > :nth-child(3) > .nav-link').contains(tagheading)
            })
        })
        //After selecting a tag, a new sub-heading will appear alongside
        cy.get('.feed-toggle').within( () => {
            cy.get('li').should('have.length',3)
        })
    })

}) 