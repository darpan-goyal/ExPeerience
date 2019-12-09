describe('Login to account', function() {
    it('addr to splash', function() {
        cy.visit('localhost:3000')
        cy.contains('Login').click()
    })
    it('nav to login', function() {
        cy.contains('Login').click()
    })
    it('enter username', function() {
        cy.get('input').eq(0).type('testSonnan')
})
    it('enter password', function() {
        cy.get('input').eq(1).type('testSonnan')
    })
    it('post using login', function() {
        cy.get('Button').eq(1).click()
        cy.wait(500)
    })
})

describe('Test Project Edit is receiving correct info', function() {
    it('Nav to Projects Page', function() {
        cy.contains('Projects').click()
    })
    it('Check correct Project Name', function() {
        cy.get('.name-box > :nth-child(1)').then(($txt) => {
            cy.contains('Edit').click()
            cy.get('.form-control').eq(0).invoke('val').should('eq', $txt.text())
        })
        cy.wait(500)
    })
    it('Click save button', function() {
        cy.contains('Save').click()
        cy.wait(1000)
    })
    it('Check correct College input', function() {
        cy.get('.name-box > :nth-child(2)').then(($txt) => {
            cy.contains('Edit').click()
            cy.get('.css-1uccc91-singleValue').invoke('text').should('eq', $txt.text())
        })
    })
    it('Click save button', function() {
        cy.contains('Save').click()
        cy.wait(1000)
    })
    it('Check correct Major input', function() {
        cy.get('.other-box > :nth-child(2)').eq(0).then(($txt) => {
            cy.contains('Edit').click()
            cy.get(':nth-child(4) > .css-2b097c-container > .css-yk16xz-control > .css-1hwfws3').invoke('text').should('eq', $txt.text())
        })
    })
    it('Click save button', function() {
        cy.contains('Save').click()
        cy.wait(1000)
    })
    it('Check correct Description input', function() {
        cy.get('.name-box > :nth-child(3)').then(($txt) => {
            cy.contains('Edit').click()
            cy.get(':nth-child(6) > .form-control').invoke('text').should('eq', $txt.text())
        })
    })
    it('Click save button', function() {
        cy.contains('Save').click()
        cy.wait(1000)
    })
    it('Check correct Peer input', function() {
        cy.get('.other-box > :nth-child(2)').eq(2).then(($txt) => {
            cy.contains('Edit').click()
            cy.get(':nth-child(7) > .css-2b097c-container > .css-yk16xz-control > .css-1hwfws3').invoke('text').should('eq', $txt.text())
        })
    })
    it('Click save button', function() {
        cy.contains('Save').click()
        cy.wait(1000)
    })
    it('Check correct Skills input', function() {
        cy.get('.other-box').eq(1).then(($txt) => {
            cy.contains('Edit').click()
            cy.get(':nth-child(5) > .css-2b097c-container > .css-yk16xz-control > .css-1hwfws3').invoke('text').should('eq', $txt.text())
        })
    })
})