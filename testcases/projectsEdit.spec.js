describe('Login to account', function() {
    it('Addr to splash', function() {
        cy.visit('localhost:3000')
        cy.contains('Login').click()
    })
    it('Nav to login', function() {
        cy.contains('Login').click()
    })
    it('Enter username', function() {
        cy.get('input').eq(0).type('testSonnan')
})
    it('Enter password', function() {
        cy.get('input').eq(1).type('testSonnan')
    })
    it('Post using login', function() {
        cy.get('Button').eq(1).click()
        cy.wait(500)
    })
})

describe('Make a test Project', function() {
    it('Nav to Projects Page', function() {
        cy.contains('Projects').click()
    })
    it('Click on New project button', function() {
        cy.contains("New").click()
    })
    it('Type a new Project Name', function() {
        cy.get(':nth-child(2) > .form-control').type("Haram Guys")
    })
    it('Select a College', function() {
        cy.get(':nth-child(3) > .css-2b097c-container > .css-yk16xz-control > .css-1hwfws3').type("San Jose State University {enter}")
    })
    it('Select a Major', function() {
        cy.get(':nth-child(4) > .css-2b097c-container > .css-yk16xz-control > .css-1hwfws3').type("Computer Science {enter}")
    })
    it('Select a Skill', function() {
        cy.get(':nth-child(5) > .css-2b097c-container > .css-yk16xz-control > .css-1hwfws3').type("Angular {enter}")    
    })
    it('Type in a  test Description', function() {
        cy.get(':nth-child(6) > .form-control').type("Test Description.")
    })
    it('Click the Create project button', function() {
        cy.contains('Create').click()
    })
})

describe('Test Project Edit is receiving correct info', function() {
    it('Nav to Projects Page', function() {
        cy.contains('Projects').click()
    })
    it('Check correct Project Name', function() {
        cy.get('.name-box > :nth-child(1)').eq(0).then(($txt) => {
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
        cy.get('.name-box > :nth-child(2)').eq(0).then(($txt) => {
            cy.contains('Edit').click()
            cy.get('.css-1uccc91-singleValue').invoke('text').should('eq', $txt.text())
        })
    })
    it('Click save button', function() {
        cy.contains('Save').click()
        cy.wait(1000)
    })
    it('Check correct Major input', function() {
        cy.get('.other-box').eq(0).then(($txt) => {
            var majors = $txt.text().replace('Majors', "")
            cy.contains('Edit').click()
            cy.get(':nth-child(4) > .css-2b097c-container > .css-yk16xz-control > .css-1hwfws3').invoke('text').should('eq', majors)
        })
    })
    it('Click save button', function() {
        cy.contains('Save').click()
        cy.wait(1000)
    })
    it('Check correct Description input', function() {
        cy.get('.name-box > :nth-child(3)').eq(0).then(($txt) => {
            cy.contains('Edit').click()
            cy.get(':nth-child(6) > .form-control').invoke('text').should('eq', $txt.text())
        })
    })
    it('Click save button', function() {
        cy.contains('Save').click()
        cy.wait(1000)
    })
    it('Check correct Peer input', function() {
        cy.get('.other-box').eq(2).then(($txt) => {
            var peers = $txt.text().replace('Peers', "")
            cy.contains('Edit').click()
            cy.get(':nth-child(7) > .css-2b097c-container > .css-yk16xz-control > .css-1hwfws3').invoke('text').should('eq', peers)
        })
    })
    it('Click save button', function() {
        cy.contains('Save').click()
        cy.wait(1000)
    })
    it('Check correct Skills input', function() {
        cy.get('.other-box').eq(1).then(($txt) => {
            var skills = $txt.text().replace('Skills', "")
            cy.contains('Edit').click()
            cy.get(':nth-child(5) > .css-2b097c-container > .css-yk16xz-control > .css-1hwfws3').invoke('text').should('eq', skills)
        })
    })
})

describe('Test Project Edit', function() {
    it('Nav to Projects Page', function() {
        cy.contains('Projects').click()
    })
    it('Click Edit button', function() {
        cy.contains('Edit').click()
    })
    it('Clear Project Name', function() {
        cy.get(':nth-child(2) > .form-control').clear()
    })
    it('Save button disabled for empty Project Name field', function() {
        cy.contains('Save').should('be.disabled')
    })
    it('Type and check if Project Name saved correctly', function() {
        cy.get(':nth-child(2) > .form-control').type('A Halal Guy')
        cy.contains('Save').click()
        cy.get('.name-box > :nth-child(1)').eq(0).then(($txt) => {
            expect($txt.text()).to.eql('A Halal Guy')
        })

    })
    
    it('Click Edit button', function() {
        cy.contains('Edit').click()
    })
    it('Clear Majors Field', function() {
        cy.get(':nth-child(4) > .css-2b097c-container > .css-yk16xz-control > .css-1hb7zxy-IndicatorsContainer > :nth-child(1) > .css-6q0nyr-Svg').click()
    })
    it('Save after clearing Majors field', function() {
        cy.contains('Save').click()
    })
    it('Click Edit button', function() {
        cy.contains('Edit').click()
    })
    it('Click College dropdown', function() {
        cy.get('div.css-1hwfws3').eq(0).click()
    })
    it('Choose colleges and check if saved correctly', function() {
        cy.get('div.css-yt9ioa-option').its('length').then(numElems => {
            cy.get('div.css-1hwfws3').eq(0).click()
            for (var i = numElems - 1; i > 0; i--) {
                cy.get('div.css-1hwfws3').eq(0).click()
                cy.wait(200)
                if(i===0)
                {
                    cy.get('div.css-yt9ioa-option').eq(i).then(($txt) => {
                        cy.contains('Save').click()
                        cy.get(':nth-child(1) > .name-box > :nth-child(2)').eq(0).invoke('val').should('eq', $txt.text())
                    })
                }
                else
                {
                    cy.get('div.css-yt9ioa-option').eq(i).click()
                }
            }

        })
        cy.contains('Save').click()
    })
    
    it('Click Edit button', function() {
        cy.contains('Edit').click()
    })

    it('Click Majors dropdown', function() {
        cy.get('div.css-1hwfws3').eq(1).click()
    })
    it('Choose majors', function() {
        cy.get('div.css-yt9ioa-option').its('length').then(numElems => {
            cy.get('div.css-1hwfws3').eq(1).click()
            for (var i = 3; i > 0; i--) {
                var index = Math.floor(Math.random() * i)
                cy.get('div.css-1hwfws3').eq(1).click()
                cy.wait(100)
                if(i===0)
                {
                    cy.get('div.css-yt9ioa-option').eq(index).then(($txt) => {
                        cy.contains('Save').click()
                        cy.get('.name-box > :nth-child(2)').invoke('val').should('eq', $txt.text())
                    })
                }
                else
                {
                    cy.get('div.css-yt9ioa-option').eq(index).click()
                }
            }
        })
        cy.contains('Save').click()
    })
    
    it('Click Edit button', function() {
        cy.contains('Edit').click()
    })
    it('Clear Skills', function() {
        cy.get(':nth-child(5) > .css-2b097c-container > .css-yk16xz-control > .css-1hb7zxy-IndicatorsContainer > :nth-child(1)').click()
    })
    it('Save after clearing Skills field', function() {
        cy.contains('Save').click()
    })
    it('Click Edit button', function() {
        cy.contains('Edit').click()
    })
    it('Click Skills dropdown', function() {
        cy.get('div.css-1hwfws3').eq(2).click()
    })
    it('Choose Skills', function() {
        cy.wait(1000)
        cy.get('div.css-yt9ioa-option').its('length').then(numElems => {
            cy.get('div.css-1hwfws3').eq(2).click()
            for (var i = 3; i > 0; i--) {
                var index = Math.floor(Math.random() * i)
                cy.get('div.css-1hwfws3').eq(2).click()
                cy.wait(400)
                cy.get('div.css-yt9ioa-option').eq(index).click()
            }
        })
    })

    it('Type Description', function() {
        cy.get(':nth-child(6) > .form-control').clear()
        cy.get(':nth-child(6) > .form-control').type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}')
        cy.get(':nth-child(6) > .form-control').type('Edited Test Description.')
        cy.get(':nth-child(6) > .form-control').then(($txt)=> {
            cy.contains('Save').click()
            cy.get('.name-box > :nth-child(3)').eq(0).then(($txt2)=> {
                expect($txt2.text()).to.equal($txt.text())
            })
        })
    })
})

describe('Result', function() {
    it('See results of Test Project', function() {
        cy.wait(10000)
    })
    it('Delete Test Project', function() {
        cy.contains('Delete').click()
    })
})