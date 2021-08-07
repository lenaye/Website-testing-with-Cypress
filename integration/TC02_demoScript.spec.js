/*
Test case to highlight some of the key elements of Cypress Web UI Testing.

The website used in this example is a publicly accessible blogger site:  http://react-redux.realworld.io


The following Cypress commands were used in this demo:

--Basic commands
cy.visits - opens a web page
cy.title - retrieves title of the webpage
cy.get - find element in the DOM
cy.contains - checks if the DOM contains an object, e.g. string

--URL commands
cy.url()
cy.hash()
cy.location('hash')

--Finding elements
1-Using class and string name:
cy.get('.btn').contains('Sign in') - combination of class name and text on a button
2-Using type and attribute name/value pair
cy.get('input[placeholder="Article Title"]')

--Verification--
.contain(string)
.should('eq',<string>)
.should('be.visible')
.should('include',<string>)

--Page navigation
cy.reload() - refreshes page
cy.go('back') - goes back a page
cy.go('forward') - goes forward a page
*/

describe('Scenario 1 - Login, Post article, Add a comment to the post and save as Favourite', () => {

    it('Log in', () => {
        cy.visit('http://react-redux.realworld.io/#/login?_k=9pjjo5')
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
    
    it('Create a new post', () => {
        cy.contains('New Post')
            .should('be.visible')
            .click()
        //3 different ways to verify URL path
        cy.url().should('include','/editor')
        cy.hash().should('include','#/editor')
        cy.location('hash').should('include','#/editor')

        //Enter post details
        let currentDate = new Date();
        let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
        var title = 'Nocturnal habits of Tasmanian wombats: ' + time
        cy.get('input[placeholder="Article Title"]')
            .type(title)
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
        cy.contains('The wombats from Tasmania have a very peculiar habits when the sun goes down.',{timeout:10000})
        cy.get('.btn[type="submit"]').contains('Post Comment')
    })


    it('Add a comment', () =>{
        //Go to Profile page
        cy.get('.nav-link').contains('leonardoa').click()
        //Wait for new page and verify page content
        cy.contains('My Articles',{timeout:10000}).should('be.visible')
        cy.get('.preview-link > p').first().click()

        //Verify that new page is the article page
        cy.url().should('include','article')
        cy.get('textarea').type('This is a wonderful article.')
        cy.contains('Post Comment').click()
        
        //Returns to profile page
        cy.get('.nav-link').contains('leonardoa').click()        
        cy.get('.preview-link > p').first().click() //opens the article page
        cy.get('.card-text').contains('This is a wonderful article.').should('be.visible')

    })


    it('Save as Favourite', () => {
        //Go to Profile page
        cy.get('.nav-link').contains('leonardoa').click()
        //Wait for new page and verify page content
        cy.contains('My Articles',{timeout:10000}).should('be.visible')
        cy.contains('Favorited Articles').should('be.visible')
        cy.get('.btn[href="#settings"]').contains(' Edit Profile Settings').should('be.visible')

        //Click on Favourite icon
        cy.get('.ion-heart').first().click()
        //Click on Favourited articles page and verify existence of favourited item 
        cy.get('.nav-link').contains('Favorited Articles').click()
        cy.url().should('include','favorites')
        //Count favourite counter to be 1
        cy.get('.btn-primary',{timeout:10000}).first().then(($fav) => {
            const favCount = $fav.text()
            expect(favCount).to.eq('1')
        })
    })

}) 