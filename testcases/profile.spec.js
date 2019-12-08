describe('goto website', function() {
    it('visit splash', function() {
        cy.visit('localhost:3000')
    })
})

describe('goto login', function() {
    it('visit login', function() {
        cy.contains('Login').click()
    })
})

describe('enter username', function() {
    it('enter uname', function() {
        cy.get('input').eq(0).type("TestUser2")
    })
})

describe('enter password', function() {
    it('enter pass', function() {
        cy.get('input').eq(1).type("password")
    })
})

describe('login', function() {
    it('login', function() {
        cy.get('Button').eq(1).click()
        cy.wait(500)
    })
})

describe('goto profile', function() {
    it('visit profile', function() {
        cy.contains('Profile').click()
        cy.wait(500)

        cy.contains('Skills').click()
        cy.wait(500)

        cy.contains('Resume').click()
        cy.wait(500)

        cy.contains('About').click()
        cy.wait(500)

        cy.contains('Edit').click()
        cy.wait(500)
    })
})

describe('logout', function() {
    it('logout', function() {
        cy.contains('Logout').click()
        cy.contains('Login').should('be.visible')
    })
})