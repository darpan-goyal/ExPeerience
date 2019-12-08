describe('Login to account', function() {
    it('addr to splash', function() {
        cy.visit('localhost:3000')
        cy.contains('Login').click()
    })
    it('nav to login', function() {
        cy.contains('Login').click()
    })
    it('enter username', function() {
        cy.get('input').eq(0).type('TestUser5')
    })
    it('enter password', function() {
        cy.get('input').eq(1).type('password')
    })
    it('post using login', function() {
        cy.get('Button').eq(1).click()
        cy.wait(500)
    })
})

describe('Create Project', function() {
    var majors = ['Computer Science', 'Computer Engineering', 'Electrical Engineering', 'Civil Engineering']
    var skills = ['JavaScript', 'Haskell', 'C++', 'Java']
    var vmajors = ['Computer Science', 'Electrical Engineering', 'Civil Engineering']
    var vskills = ['JavaScript', 'Haskell', 'Java']
    var vDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    var vProjectName = 'TestProj75'
    it('nav to project create', function() {
        cy.contains('Projects').click()
        cy.contains('New').click()
    })
    it('type project name', function() {
        cy.get('input').eq(0).type(vProjectName)
    })
    it('choose colleges', function() {
        cy.get('div.css-1hwfws3').eq(0).click()
        cy.get('div.css-yt9ioa-option').its('length').then(numElems => {
            var index = Math.floor(Math.random() * numElems)
            cy.get('div.css-yt9ioa-option').eq(index).click()
        })
    })
    it('choose majors', function() {
        for(var i in majors) {
            cy.get('div.css-1hwfws3').eq(1).click()
            cy.get('div.css-yt9ioa-option').contains(majors[i]).click()
        }
    })
    it('delete all majors', function() {
        cy.get(':nth-child(1) > .css-6q0nyr-Svg > path').click()
    })
    it('choose majors', function() {
        for(var i in majors) {
            cy.get('div.css-1hwfws3').eq(1).click()
            cy.get('div.css-yt9ioa-option').contains(majors[i]).click()
        }
    })
    it('delete a major', function() {
        cy.get('div.css-xb97g8').eq(1).click()
    })
    it('choose skills', function() {
        for(var i in skills) {
            cy.get('div.css-1hwfws3').eq(2).click()
            cy.get('div.css-yt9ioa-option').contains(skills[i]).click()
        }
    })
    it('delete all skills', function() {
        cy.get(':nth-child(1) > .css-6q0nyr-Svg > path').eq(1).click()
    })
    it('choose skills', function() {
        for(var i in skills) {
            cy.get('div.css-1hwfws3').eq(2).click()
            cy.get('div.css-yt9ioa-option').contains(skills[i]).click()
        }
    })
    it('delete a skill', function() {
        cy.get('div.css-xb97g8').eq(5).click()
    })
    it('type description', function() {
        cy.get('textarea').type(vDescription)
    })
    it('create project', function() {
        cy.get('.pull-right').click()
        cy.wait(500)
    })
    it('verify redirect to project page', function() {
        cy.url().should('eq', 'http://localhost:3000/projects')
    })
    it('verify new project', function() {
        cy.get('.project-item').its('length').then(projCt => {
            cy.get('.project-item').eq(projCt - 1)
            for(var i in vmajors) {
                cy.get('.project-item').eq(projCt - 1).invoke('text').should('include', vmajors[i])
            }
            for(var i in vskills) {
                cy.get('.project-item').eq(projCt - 1).invoke('text').should('include', vskills[i])
            }
            cy.get('.project-item').eq(projCt - 1).invoke('text').should('include', 'Test User5')
            cy.get('.project-item').eq(projCt - 1).invoke('text').should('include', vDescription)
            cy.get('.project-item').eq(projCt - 1).invoke('text').should('include', vProjectName)
            cy.get('.project-item').eq(projCt - 1).invoke('text').should('not.include', 'Computer Engineering')
            cy.get('.project-item').eq(projCt - 1).invoke('text').should('not.include', 'C++')
        })
    })
    it('delete project', function() {
        cy.get('.project-item').its('length').then(projCt => {
            cy.get('.project-item').eq(projCt - 1).contains('Delete').click()
        })
    })
    it('check if delete was updated', function() {
        cy.get('.project-item').should('not.exist')
    })
})