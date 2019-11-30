describe('Signup test', function() {
   
    it('visit splash', function() {
            cy.visit('localhost:3000')
    })

    it('visit signup', function() {
            cy.contains('Sign Up').click()
    })
     
    it('check validation message/submit button on invalid input: more than 50 characters, empty input, passeord <=8', () => {
        cy.get('[type="submit"]').should('be.disabled').as('ButtonDisable')
    
        cy.get(':nth-child(2) > .form-control').type('inputistoolonginputistoolonginputistoolonginputistoolonginputistoolong').get('.has-error > .form-control')
        .get('@ButtonDisable')

        cy.get(':nth-child(2) > .form-control').clear()
        .get('@ButtonDisable')

        cy.get(':nth-child(3) > .form-control').type('inputistoolonginputistoolonginputistoolonginputistoolonginputistoolong').get('.has-error > .form-control')
        .get('@ButtonDisable')

        cy.get(':nth-child(3) > .form-control').clear()
        .get('@ButtonDisable')

        cy.get(':nth-child(4) > .form-control').type('inputistoolonginputistoolonginputistoolonginputistoolonginputistoolong')
        .get('.has-error > .form-control')
        .get('@ButtonDisable')

        cy.get(':nth-child(4) > .form-control').clear()
        .get('@ButtonDisable')

        cy.get(':nth-child(5) > .form-control').type('inputistoolonginputistoolonginputistoolonginputistoolonginputistoolong').get('.has-error > .form-control')
        .get('@ButtonDisable')

        cy.get(':nth-child(5) > .form-control').clear()
        .get('@ButtonDisable')

        cy.get(':nth-child(5) > .form-control').type('rjejrje')


        cy.get(':nth-child(6) > .form-control').type('inputistoolonginputistoolonginputistoolonginputistoolonginputistoolong')
        .get('@ButtonDisable')

        cy.get(':nth-child(6) > .form-control').clear()
        .get('@ButtonDisable')

        cy.get(':nth-child(6) > .form-control').type('rjejrje')
        .get('@ButtonDisable')

    })

    //need to make valid input dynamic for retry-ability
    it('test password fields with different valid inputs', function() {

        cy.get(':nth-child(5) > .form-control').clear()
        cy.get(':nth-child(6) > .form-control').clear()
       
        cy.get(':nth-child(2) > .form-control').type('word7')
        cy.get(':nth-child(3) > .form-control').type('word7')
        cy.get(':nth-child(4) > .form-control').type('word7')
        cy.get(':nth-child(5) > .form-control').type('password7')
        cy.get(':nth-child(6) > .form-control').type('passwood7')
        cy.get('[type="submit"]').should('be.disabled')
    })

    it('test password fields with the same valid inputs', function() {

        cy.get(':nth-child(5) > .form-control').clear()
        cy.get(':nth-child(6) > .form-control').clear()

        cy.get(':nth-child(5) > .form-control').type('password7')
        cy.get(':nth-child(6) > .form-control').type('password7')
        cy.get('[type="submit"]').should('be.enabled').click()
        cy.get('.help-block-username').should('not.exist')
             
        cy.contains('Logout').click()
        cy.contains('Sign Up').click()

    })

    it('check if invalid messege pop up when account is already exists', function() {

        cy.get(':nth-child(2) > .form-control').type('word7')
        cy.get(':nth-child(3) > .form-control').type('word7')
        cy.get(':nth-child(4) > .form-control').type('word7')
        cy.get(':nth-child(5) > .form-control').type('password7')
        cy.get(':nth-child(6) > .form-control').type('password7')
        cy.get('[type="submit"]').should('be.enabled').click()
        cy.get('.help-block-username')
    })
    
   
    
})