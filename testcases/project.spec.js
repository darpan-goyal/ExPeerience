describe('Website', function() {
  it('visit splash', function() {
    cy.visit('localhost:3000')
  })
})

describe('Projects - not logged in', function() {
  it('unable to visit projects page', function() {
    cy.contains('Projects').should('not.exist')
  })
})

describe('Projects - logged in', function() {
  var username = 'TestUser1'
  var password = 'password'

  it('able to login', function() {
    cy.contains('Login').click()
    cy.get('input').eq(0).type(username)
    cy.get('input').eq(1).type(password)
    cy.get('button').eq(1).click()
    cy.wait(500)
  })

  it('logged in', function() {
    cy.contains('Logout').should('be.visible')
  })

  it('able to visit projects', function() {
    cy.contains('Projects').click()
  })

  it('able to view all of one\'s projects', function() {
    cy.request('POST', '/user/authenticate', { username: username, password: password })
      .then(res => cy.request('POST', '/project/search', { creator: res.body._id })
        .then(res => {
          if (res.body.length > 0)
            cy.get('.project-item').its('length').should('eq', res.body.length)
          else
            cy.get('.project-item').should('not.exist')
        })
      )
  })

  it('able to click new button', function() {
    cy.contains("New").should('be.enabled')
  })

  it('able to navigate to new project page', function() {
    cy.contains("New").click()
    cy.contains("Project").click()
  })

  it('able to click edit button', function() {
    cy.contains("Edit").eq(0).should('be.enabled')
  })

  it('able to navigate to edit project page', function() {
    cy.contains("Edit").eq(0).click()
    cy.contains("Save").click()
  })

  it('able to click delete button', function() {
    cy.contains("Delete").eq(0).should('be.enabled')
  })

  var projectName = "TestProject"
  var projectCollege = "San Jose State University"
  var projectDescription = "This is a test project"

  it('creating a project to test project delete functionality', function() {
    cy.contains("New").click()
    cy.get('input').eq(0).type(projectName)
    cy.get('div.css-1hwfws3').eq(0).click()
    cy.get('.css-4ljt47-MenuList').children().contains(projectCollege).click()
    cy.get('textarea').type(projectDescription)
    cy.contains("Create").click()
  })

  it('able to delete project', function() {
    cy.contains(projectName).parent().parent('.project-item').within(() => {
      cy.contains('Delete').click()
    })

    cy.contains(projectName).should('not.exist')

    cy.request('POST', '/user/authenticate', { username: username, password: password })
      .then(res => cy.request('POST', '/project/search', { creator: res.body._id })
        .then(res => {
          if (res.body.length > 0)
            cy.get('.project-item').its('length').should('eq', res.body.length)
          else
            cy.get('.project-item').should('not.exist')
        })
      )
  })
})