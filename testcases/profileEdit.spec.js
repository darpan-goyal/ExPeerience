describe('Login to account', function() {
    it('addr to splash', function() {
        cy.visit('localhost:3000')
        cy.contains('Login').click()
    })
    it('nav to login', function() {
        cy.contains('Login').click()
    })
    it('enter username', function() {
        cy.get('input').eq(0).type('TestUser4')
    })
    it('enter password', function() {
        cy.get('input').eq(1).type('password')
    })
    it('post using login', function() {
        cy.get('Button').eq(1).click()
        cy.wait(500)
    })
})

describe('Test Profile Edit', function() {
    it('nav to projects page', function() {
        cy.contains('Profile').click()
    })
    it('click Edit button', function() {
        cy.contains('Edit').click()
    })
    it('type first name', function() {
        cy.get('input').eq(0).clear()
        cy.get('input').eq(0).type('Test First Name')
    })
    it('type last name', function() {
        cy.get('input').eq(1).clear()
        cy.get('input').eq(1).type('Test Last Name')
    })
    it('click college dropdown', function() {
        cy.get('div.css-1hwfws3').eq(0).click()
    })
    it('choose colleges', function() {
        cy.get('div.css-yt9ioa-option').its('length').then(numElems => {
            cy.get('div.css-1hwfws3').eq(0).click()
            for (var i = numElems - 1; i > 0; i--) {
                cy.get('div.css-1hwfws3').eq(0).click()
                cy.get('div.css-yt9ioa-option').eq(i).click()
            }
        })
    })
    it('click majors dropdown', function() {
        cy.get('div.css-1hwfws3').eq(1).click()
    })
    it('choose majors', function() {
        cy.get('div.css-yt9ioa-option').its('length').then(numElems => {
            cy.get('div.css-1hwfws3').eq(1).click()
            for (var i = numElems; i > 0; i--) {
                var index = Math.floor(Math.random() * i)
                cy.get('div.css-1hwfws3').eq(1).click()
                cy.get('div.css-yt9ioa-option').eq(index).click()
            }
        })
    })
    it('click skills dropdown', function() {
        cy.get('div.css-1hwfws3').eq(2).click()
    })
    it('choose skills', function() {
        cy.get('div.css-yt9ioa-option').its('length').then(numElems => {
            cy.get('div.css-1hwfws3').eq(2).click()
            for (var i = numElems; i > 0; i--) {
                var index = Math.floor(Math.random() * i)
                cy.get('div.css-1hwfws3').eq(2).click()
                cy.wait(40)
                cy.get('div.css-yt9ioa-option').eq(index).click()
            }
        })
    })
    it('type description', function() {
        cy.get('textarea').type('Lorem ipsum dolor sit amet')
        cy.get('textarea').type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}')
        cy.get('textarea').type('Lorem ipsum dolor sit amet')
    })
    it('click Edit button', function() {
        cy.contains('Save').click()
    })
})