import LoginPage from "./pom_classes"

describe('Login using POM', () => {
    it('Sign in', () => {
        const login = new LoginPage
        login.visit()
        login.inputEmail('len.aye@nandawon.com')
        login.inputPassword('test1ng!')
        login.clickSubmit()
        cy.contains('Your Feed',{timeout:10000}).should('be.visible')

    })

})