/* Page Object Model
The example shows the creation and usage of Page Object Model for 
abstracting the UI elements from the test script.

Here, the UI elements (which could change over time) are described within individual
methods and the testscripts simply calls the method names, thereby improving the robustness 
of the test cases. 

*/

class LoginPage
{
    visit()
    {
       cy.visit('http://react-redux.realworld.io/#/login?_k=9pjjo5')
    }

    inputEmail(value)
    {
        cy.get('input[type="email"]').type(value)
    }

    inputPassword(value)
    {
        cy.get('input[type="password"]').type(value)
        return this
    }

    clickSubmit()
    {
        cy.get('.btn').contains('Sign in')
        .should('be.visible')
        .click()
        return this
    }

}

export default LoginPage