describe('Signup test', function() {
   
    it('visit splash', function() {
        cy.visit('localhost:3000')
    })

    it('visit signup', function() {
        cy.contains('Sign Up').click()
    })
     
    it('check validation message/submit button on invalid input: more than 50 characters, empty, password <=8', () => {
       
        cy.get('[type="submit"]').should('be.disabled').as('ButtonDisable')
    
        cy.get(':nth-child(2) > .form-control').type('inputistoolonginputistoolonginputistoolonginputistoolonginputistoolong')
        .get('.has-error > .form-control')
        .get('@ButtonDisable').should('exist')

        cy.get(':nth-child(2) > .form-control').clear()
        .get('@ButtonDisable').should('exist')

        cy.get(':nth-child(3) > .form-control').type('inputistoolonginputistoolonginputistoolonginputistoolonginputistoolong')
        .get('.has-error > .form-control')
        .get('@ButtonDisable').should('exist')

        cy.get(':nth-child(3) > .form-control').clear()
        .get('@ButtonDisable').should('exist')

        cy.get(':nth-child(4) > .form-control').type('inputistoolonginputistoolonginputistoolonginputistoolonginputistoolong')
        .get('.has-error > .form-control')
        .get('@ButtonDisable').should('exist')

        cy.get(':nth-child(4) > .form-control').clear()
        .get('@ButtonDisable').should('exist')

        cy.get(':nth-child(5) > .form-control').type('inputistoolonginputistoolonginputistoolonginputistoolonginputistoolong')
        .get('.has-error > .form-control')
        .get('@ButtonDisable').should('exist')

        cy.get(':nth-child(5) > .form-control').clear()
        .get('@ButtonDisable').should('exist')

        cy.get(':nth-child(5) > .form-control').type('rjejrje').get('@ButtonDisable').should('exist')

        cy.get(':nth-child(6) > .form-control').type('inputistoolonginputistoolonginputistoolonginputistoolonginputistoolong')
        .get('@ButtonDisable').should('exist')

        cy.get(':nth-child(6) > .form-control').clear()
        .get('@ButtonDisable').should('exist')

        cy.get(':nth-child(6) > .form-control').type('rjejrje').get('@ButtonDisable').should('exist')
    })

    it('test password fields with not matching inputs', function() {
        cy.get(':nth-child(5) > .form-control').clear()
        cy.get(':nth-child(6) > .form-control').clear()
       
        cy.get(':nth-child(2) > .form-control').type('Test') //first name
        cy.get(':nth-child(3) > .form-control').type('User99') //last name
        cy.get(':nth-child(4) > .form-control').type('TestUser99') //username
        cy.get(':nth-child(5) > .form-control').type('password') //pasword
        cy.get(':nth-child(6) > .form-control').type('wrongPassword') //confirm password
        cy.get('[type="submit"]').should('be.disabled')
    })

    it('test password fields with matching inputs', function() {

        cy.get(':nth-child(5) > .form-control').clear()
        cy.get(':nth-child(6) > .form-control').clear()

        cy.get(':nth-child(5) > .form-control').type('password')
        cy.get(':nth-child(6) > .form-control').type('password')
        cy.get('[type="submit"]').should('be.enabled').click()
        cy.get('.help-block-username').should('not.exist')
             
        cy.contains('Logout').click()
        cy.contains('Sign Up').click()
    })

    
    it('check if non-exisiting signup info is stored in database after Submit button is clicked.', function() {
        cy.request('POST', '/user/authenticate', { username: 'TestUser99', password: 'password', firstName: 'Test', lastName: 'User99'})
    })

    it('check if invalid message pops up when username already exists', function() {

        cy.get(':nth-child(2) > .form-control').type('word7')
        cy.get(':nth-child(3) > .form-control').type('word7')
        cy.get(':nth-child(4) > .form-control').type('TestUser99')
        cy.get(':nth-child(5) > .form-control').type('password8')
        cy.get(':nth-child(6) > .form-control').type('password8')
        cy.get('[type="submit"]').should('be.enabled').click()
        cy.get('.help-block-username')
    })

    it('check if Signup form with an existing username should not overwrite the database', function() {
        cy.request('POST', '/user/authenticate', { username: 'TestUser99', password: 'password', firstName: 'Test', lastName: 'User99'})        
            //deteting test account so test can be re-run
        cy.request('POST', '/user/authenticate', { username: 'TestUser99', password: 'password' })
          .then(res => cy.request('DELETE', '/user/' + res.body._id))
    }) 
})
