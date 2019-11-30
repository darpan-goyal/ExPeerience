describe('Login test', function() {
   
    
    it('visit splash', function() {
        cy.visit('localhost:3000')
    })

    it('visit login', function() {
        cy.contains('Login').click()
    })
    
    //beforeEach( function() {
    //    cy.get(':nth-child(2) > .form-control').clear()
    //    cy.get(':nth-child(3) > .form-control').clear()
    //})

    it('login in with wrong username', function() {
        cy.get(':nth-child(2) > .form-control').type('wordd')
        cy.get(':nth-child(3) > .form-control').type('password')
        cy.get('[type="submit"]').click().should('be.disabled')
        cy.get('.help-block-credentials') 
         
        cy.get(':nth-child(2) > .form-control').clear()
        cy.get(':nth-child(3) > .form-control').clear()
    })

    it('login in with wrong, invalid length username', function() {
        cy.get(':nth-child(2) > .form-control').type('wordwordwordwordwordwordwordwordwordwordwordwordwordwordwordwordwordword')
        cy.get(':nth-child(3) > .form-control').type('password')
        cy.get('[type="submit"]').should('be.disabled')
        cy.get('.help-block-credentials')   

        cy.get(':nth-child(2) > .form-control').clear()
        cy.get(':nth-child(3) > .form-control').clear()
    })
    
    it('login with wrong password',function() {
        cy.get(':nth-child(2) > .form-control').type('word')
        cy.get(':nth-child(3) > .form-control').type('passswordd')
        cy.get('[type="submit"]').click().should('be.disabled')
        cy.get('.help-block-credentials')

        cy.get(':nth-child(2) > .form-control').clear()
        cy.get(':nth-child(3) > .form-control').clear()
    })

    it('login with wrong, invalid length password',function() {
        cy.get(':nth-child(2) > .form-control').type('word')
        cy.get(':nth-child(3) > .form-control').type('pass')
        cy.get('[type="submit"]').click().should('be.disabled')
        cy.get('.help-block-credentials')

        cy.get(':nth-child(2) > .form-control').clear()
        cy.get(':nth-child(3) > .form-control').clear()
    })
    
    it('login with an invalid account',function() {
        cy.get(':nth-child(2) > .form-control').type('ugg')
        cy.get(':nth-child(3) > .form-control').type('abcdefgh')
        cy.get('[type="submit"]').click().should('be.disabled')
        cy.get('.help-block-credentials')

        cy.get(':nth-child(2) > .form-control').clear()
        cy.get(':nth-child(3) > .form-control').clear()
    })

    it('login with an invalid length input account',function() {
        cy.get(':nth-child(2) > .form-control').type('fhfhfhfhfhfhfhfhfhfhfhfhfhfhfhfhfhfhfhfhfhfhfhfhfhfhfhfhfhfhf')
        cy.get(':nth-child(3) > .form-control').type('efgh')
        cy.get('[type="submit"]').should('be.disabled')
        cy.get('.help-block-credentials')

        cy.get(':nth-child(2) > .form-control').clear()
        cy.get(':nth-child(3) > .form-control').clear()

    })
    
    it ('login with username empty',function() {
        cy.get(':nth-child(2) > .form-control').type('word')
        cy.get('[type="submit"]').should('be.disabled')

        cy.get(':nth-child(2) > .form-control').clear()
        cy.get(':nth-child(3) > .form-control').clear()
    })

    it ('login with password empty',function() {
        cy.get(':nth-child(3) > .form-control').type('password')
        cy.get('[type="submit"]').should('be.disabled')

        cy.get(':nth-child(2) > .form-control').clear()
        cy.get(':nth-child(3) > .form-control').clear()
    })

    it('login with valid account', function() {
        cy.get(':nth-child(2) > .form-control').type('word')
        cy.get(':nth-child(3) > .form-control').type('password')
        cy.get('[type="submit"]').click()
        cy.contains('Browse')
        cy.contains('Projects')
        cy.contains('Requests')
        cy.contains('Messages')
        cy.contains('Profile')
        cy.contains('Logout')      
    })
})
