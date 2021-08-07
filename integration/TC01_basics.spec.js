describe('Login', () => {
    it('Sign in', () => {
        //Enter post details
        cy.visit('http://react-redux.realworld.io/#/login?_k=9pjjo5')
        cy.get('input[type="email"]').type('len.aye@nandawon.com',{ delay: 100 })
        cy.get('input[type="password"]').type('test1ng!',{ delay: 100 })
        cy.get('.btn').contains('Sign in').should('be.visible').click()
        cy.url().should('include','http://react-redux.realworld.io')
        
    })

})