describe('Login to account', function() {
    it('addr to splash', function() {
        cy.visit('localhost:3000')
        cy.contains('Login').click()
    })
    it('nav to login', function() {
        cy.contains('Login').click()
    })
    it('enter username', function() {
        cy.get('input').eq(0).type('pass')
    })
    it('enter password', function() {
        cy.get('input').eq(1).type('pass')
    })
    it('post using login', function() {
        cy.get('Button').eq(1).click()
        cy.wait(500)
    })
})

describe('Nav to project create', function() {
    it('nav to projects page', function() {
        cy.contains('Projects').click()
    })
    it('click New button', function() {
        cy.contains('New').click()
    })
})

describe('Description', function() {
    it('type description', function() {
        cy.get('textarea').type('Lorem ipsum dolor sit amet')
    })
    it('should contain: lorem ipsum', function() {
        cy.get('textarea').should('have.value', 'Lorem ipsum dolor sit amet')
    })
    it('should disabled: create button', function() {
        cy.get('.pull-right').should('be.disabled')
    })
    it('clear description', function() {
        cy.get('textarea').type('{selectall}{backspace}')
    })
    it('should contain: nothing', function() {
        cy.get('textarea').should('not.have.value', 'Lorem ipsum dolor sit amet')
    })
    it('should disabled: create button', function() {
        cy.get('.pull-right').should('be.disabled')
    })
})

describe('College', function() {
    it('click college dropdown', function() {
        cy.get('div.css-1hwfws3').eq(0).click()
    })
    it('try all colleges', function() {
        cy.get('div.css-yt9ioa-option').its('length').then(numElems => {
            for (var i = numElems - 1; i > 0; i--) {
                cy.get('div.css-yt9ioa-option').eq(i).click()
                cy.get('div.css-1hwfws3').eq(0).click()
            }
            cy.get('div.css-1hwfws3').eq(0).click()
        })
    })
    it('should disabled: create button', function() {
        cy.get('.pull-right').should('be.disabled')
    })
})

describe('Majors', function() {
    it('click majors dropdown', function() {
        cy.get(':nth-child(4) > .css-2b097c-container > .css-yk16xz-control > .css-1hb7zxy-IndicatorsContainer > .css-tlfecz-indicatorContainer > .css-6q0nyr-Svg').click()
    })
    it('choose all majors randomly', function() {
        cy.get('div.css-yt9ioa-option').its('length').then(numElems => {
            for (var i = numElems; i > 0; i--) {
                var index = Math.floor(Math.random() * i)
                cy.get('div.css-yt9ioa-option').eq(index).click()
                cy.get(':nth-child(3) > .css-6q0nyr-Svg').click()
            }
            cy.get(':nth-child(3) > .css-6q0nyr-Svg').click()
        })
    })
    it('delete random majors', function() {
        cy.get('div.css-xb97g8').its('length').then(numElems => {
            for (var i = numElems; i > 5; i--) {
                var index = Math.floor(Math.random() * i)
                cy.get('div.css-xb97g8').eq(index).click()
            }
        })
    })
    it('should exist: 5 majors', function() {
        cy.get('div.css-xb97g8').should(($majors) => {
            expect($majors).to.have.length(5)
        })
    })
    it('delete all majors', function() {
        cy.get(':nth-child(1) > .css-6q0nyr-Svg > path').click()
    })
    it('should exist: 0 majors', function() {
        cy.get('div.css-xb97g8').should(($majors) => {
            expect($majors).to.have.length(0)
        })
    })
})

describe('Skills', function() {
    it('click skills dropdown', function() {
        cy.get(':nth-child(5) > .css-2b097c-container > .css-yk16xz-control > .css-1hb7zxy-IndicatorsContainer > .css-tlfecz-indicatorContainer > .css-6q0nyr-Svg').click()
    })
    it('choose all skills randomly', function() {
        cy.get('div.css-yt9ioa-option').its('length').then(numElems => {
            for (var i = numElems; i > 0; i--) {
                var index = Math.floor(Math.random() * i)
                cy.get('div.css-yt9ioa-option').eq(index).click()
                cy.get('.css-1pahdxg-control > .css-1hb7zxy-IndicatorsContainer > :nth-child(3) > .css-6q0nyr-Svg').click()
            }
            cy.get('.css-1pahdxg-control > .css-1hb7zxy-IndicatorsContainer > :nth-child(3) > .css-6q0nyr-Svg').click()
        })
    })
    it('delete random skills', function() {
        cy.get('div.css-xb97g8').its('length').then(numElems => {
            for (var i = numElems; i > 10; i--) {
                var index = Math.floor(Math.random() * i)
                cy.get('div.css-xb97g8').eq(index).click()
            }
        })
    })
    it('should exist: 10 skills', function() {
        cy.get('div.css-xb97g8').should(($majors) => {
            expect($majors).to.have.length(10)
        })
    })
    it('delete all skills', function() {
        cy.get(':nth-child(1) > .css-6q0nyr-Svg > path').click()
    })
    it('should exist: 0 skills', function() {
        cy.get('div.css-xb97g8').should(($majors) => {
            expect($majors).to.have.length(0)
        })
    })
})


describe('Project Name', function() {
    it('< 4 characters', function() {
        cy.get('input').eq(0).type('fff')
    })
    it('should disabled: create button', function() {
        cy.get('.pull-right').should('be.disabled')
    })
    it('3 < characters < 33', function() {
        cy.get('input').eq(0).type('f')
    })
    it('should enabled: create button', function() {
        cy.get('.pull-right').should('be.enabled')
    })
    it('delete a character', function() {
        cy.get('input').eq(0).type('{backspace}')
    })
    it('should disabled: create button', function() {
        cy.get('.pull-right').should('be.disabled')
    })
    it('32 characters', function() {
        cy.get('input').eq(0).type('fffffffffffffffffffffffffffff')
    })
    it('should enabled: create button', function() {
        cy.get('.pull-right').should('be.enabled')
    })
    it('> 32 characters', function() {
        cy.get('input').eq(0).type('f')
    })
    it('should disabled: create button', function() {
        cy.get('.pull-right').should('be.disabled')
    })
    it('delete a character', function() {
        cy.get('input').eq(0).type('{backspace}')
    })
    it('should enabled: create button', function() {
        cy.get('.pull-right').should('be.enabled')
    })
})