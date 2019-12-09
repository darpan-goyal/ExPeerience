describe('Login to account', function() {
    it('addr to splash', function() {
        cy.visit('localhost:3000')
        cy.contains('Login').click()
    })
    it('nav to login', function() {
        cy.contains('Login').click()
    })
    it('enter username', function() {
        cy.get('input').eq(0).type('TestUser1')
})
    it('enter password', function() {
        cy.get('input').eq(1).type('password')
    })
    it('post using login', function() {
        cy.get('Button').eq(1).click()
        cy.wait(500)
    })
})

describe('Test Profile Edit is receiving correct info', function() {
    it('nav to projects page', function() {
        cy.contains('Profile').click()
    })
    it('check correct input names', function() {
        cy.get('.media-heading').then(($txt) => {
            cy.contains('Edit').click()
            cy.get('.form-control').eq(0).invoke('val').should('eq', $txt.text().split(' ')[0])
            cy.get('.form-control').eq(1).invoke('val').should('eq', $txt.text().split(' ')[1])
        })
    })
    it('click save button', function() {
        cy.contains('Save').click()
    })
    it('check correct college input', function() {
        cy.get('.media-body > :nth-child(2)').then(($txt) => {
            cy.contains('Edit').click()
            cy.get(':nth-child(4) > .css-2b097c-container > .css-yk16xz-control > .css-1hwfws3').invoke('val').should('eq', $txt.text())
        })
    })
    it('click save button', function() {
        cy.contains('Save').click()
    })
    it('check correct Major input', function() {
        cy.get('.media-body > :nth-child(3)').then(($txt) => {
            cy.contains('Edit').click()
            cy.get(':nth-child(5) > .css-2b097c-container > .css-yk16xz-control > .css-1hwfws3').invoke('val').should('eq', $txt.text())
        })
    })
    it('click save button', function() {
        cy.contains('Save').click()
    })
    it('check correct biography input', function() {
        cy.get('p').then(($txt) => {
            cy.contains('Edit').click()
            cy.get(':nth-child(7) > .form-control').invoke('val').should('eq', $txt.text())
        })
    })
})

describe('Test Profile Edit', function() {
    it('nav to projects page', function() {
        cy.contains('Profile').click()
    })
    it('click Edit button', function() {
        cy.contains('Edit').click()
    })
    it('clear first name', function() {
        cy.get('input').eq(0).clear()
    })
    it('Save button disabled for empty first name field', function() {
        cy.contains('Save').should('be.disabled')
    })
    it('type and check if first name saved correctly', function() {
        cy.get('input').eq(0).type('Test')
        cy.contains('Save').click()
        cy.get('.media-heading').then(($txt) => {
            expect($txt.text().split(' ')[0]).to.eql('Test')
        })

    })
    it('click Edit button', function() {
        cy.contains('Edit').click()
    })
    it('Clear last name field', function() {
        cy.get('input').eq(1).clear()
    })
    it('Save button disabled for empty last name field', function() {
        cy.contains('Save').should('be.disabled')
    })
    it('type and check if last name saved correctly', function() {
        cy.get('input').eq(1).type('User1')
        cy.contains('Save').click()
        cy.get('.media-heading').then(($txt) => {
            expect($txt.text().split(' ')[1]).to.eql('User1')
        })
    })
    it('click Edit button', function() {
        cy.contains('Edit').click()
    })
    it('clear college', function() {
        cy.get(':nth-child(4) > .css-2b097c-container > .css-yk16xz-control > .css-1hb7zxy-IndicatorsContainer > :nth-child(1) > .css-6q0nyr-Svg').click()
    })
    it('click college dropdown', function() {
        cy.get('div.css-1hwfws3').eq(0).click()
    })
    it('choose colleges and check if saved correctly', function() {
        cy.get('div.css-yt9ioa-option').its('length').then(numElems => {
            cy.get('div.css-1hwfws3').eq(0).click()
            for (var i = numElems - 1; i > 0; i--) {
                cy.get('div.css-1hwfws3').eq(0).click()
                if(i===0)
                {
                    cy.get('div.css-yt9ioa-option').eq(i).then(($txt) => {
                        cy.contains('Save').click()
                        cy.get('.media-body > :nth-child(2)').invoke('val').should('eq', $txt.text())
                    })
                }
                else
                {
                    cy.get('div.css-yt9ioa-option').eq(i).click()
                }
            }

        })
    })
    it('click Edit button', function() {
        cy.contains('Edit').click()
    })
    it('clear majors dropdown', function() {
        cy.get(':nth-child(6) > .css-2b097c-container > .css-yk16xz-control > .css-1hb7zxy-IndicatorsContainer > :nth-child(1)')
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
                if(i===0)
                {
                    cy.get('div.css-yt9ioa-option').eq(index).then(($txt) => {
                        cy.contains('Save').click()
                        cy.get('.media-body > :nth-child(2)').invoke('val').should('eq', $txt.text())
                    })
                }
                else
                {
                    cy.get('div.css-yt9ioa-option').eq(index).click()
                }
            }
        })
    })
    it('click Edit button', function() {
        cy.contains('Edit').click()
    })
    it('clear skills', function() {
        cy.get(':nth-child(6) > .css-2b097c-container > .css-yk16xz-control > .css-1hb7zxy-IndicatorsContainer > :nth-child(1) > .css-6q0nyr-Svg').click()
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
        cy.get('textarea').clear()
        cy.get('textarea').type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}')
        cy.get('textarea').type('Lorem ipsum dolor sit amet')
        cy.get('textarea').then(($txt)=> {
            cy.contains('Save').click()
            cy.get('p').then(($txt2)=> {
                expect($txt2.text()).to.equal($txt.text())
            })
        })
        
    })
})