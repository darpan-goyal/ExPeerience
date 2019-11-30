describe('Website', function() {
  it('visit splash', function() {
    cy.visit('localhost:3000')
  })
})

describe('Browse - not logged in', function() {
  it('not logged in', function() {
    cy.contains('Login').should('be.visible')
  })

  it('able to visit browse', function() {
    cy.contains('Browse').click()
  })

  it('able to view all projects', function() {
    cy.contains('Filter').click()
    cy.request('GET', '/project')
      .then(res => cy.get('button.list-group-item').its('length').should('eq', res.body.length))
  })

  it('unable to apply to any projects', function() {
    cy.get('button.list-group-item').each((element) => {
      cy.wrap(element).click()
      cy.get('.btn-warning').should('be.disabled')
    })
  })

  it('able to view all colleges', function() {
    cy.reload()
    cy.get('.css-1hwfws3').eq(0).click()
    cy.request('GET', '/college')
      .then(res => cy.get('.css-4ljt47-MenuList').children().its('length').should('eq', res.body.length))
  })

  it('able to view all majors', function() {
    cy.reload()
    cy.get('.css-1hwfws3').eq(1).click()
    cy.request('GET', '/major')
      .then(res => cy.get('.css-4ljt47-MenuList').children().its('length').should('eq', res.body.length))
  })

  it('able to view all skills', function() {
    cy.reload()
    cy.get('.css-1hwfws3').eq(2).click()
    cy.request('GET', '/skill')
      .then(res => cy.get('.css-4ljt47-MenuList').children().its('length').should('eq', res.body.length))
  })

  it('able to filter projects', function() {
    //work in progress
  })
})

describe('Browse - logged in', function() {
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

  it('able to visit browse', function() {
    cy.contains('Browse').click()
  })

  it('able to view all projects', function() {
    cy.contains('Filter').click()
    cy.request('GET', '/project')
      .then(res => cy.get('button.list-group-item').its('length').should('eq', res.body.length))
  })

  it('unable to apply to own projects', function() {
    cy.request('POST', '/user/authenticate', { username: username, password: password })
      .then(res => cy.request('POST', '/project/search', { creator: res.body._id }))
      .then(res => cy.get('b.list-group-item-heading').each((element) => {
        var projectName = element.text()
        var ownProject = res.body.find(project => project.name === projectName)
        if (ownProject) {
          cy.wrap(element).click()
          cy.get('.btn-warning').should('be.disabled')
        }
      }))
  })

  it('able to apply to other projects', function() {
    cy.request('POST', '/user/authenticate', { username: username, password: password })
      .then(res => cy.request('POST', '/project/search', { creator: res.body._id }))
      .then(res => cy.get('b.list-group-item-heading').each((element) => {
        var projectName = element.text()
        var ownProject = res.body.find(project => project.name === projectName)
        if (ownProject === undefined) {
          cy.wrap(element).click()
          cy.get('.btn-warning').should('be.enabled')
        }
      }))
  })

  it('able to view all colleges', function() {
    cy.reload()
    cy.get('.css-1hwfws3').eq(0).click()
    cy.request('GET', '/college')
      .then(res => cy.get('.css-4ljt47-MenuList').children().its('length').should('eq', res.body.length))
  })

  it('able to view all majors', function() {
    cy.reload()
    cy.get('.css-1hwfws3').eq(1).click()
    cy.request('GET', '/major')
      .then(res => cy.get('.css-4ljt47-MenuList').children().its('length').should('eq', res.body.length))
  })

  it('able to view all skills', function() {
    cy.reload()
    cy.get('.css-1hwfws3').eq(2).click()
    cy.request('GET', '/skill')
      .then(res => cy.get('.css-4ljt47-MenuList').children().its('length').should('eq', res.body.length))
  })

  it('able to filter projects', function() {
    //work in progress
  })
})