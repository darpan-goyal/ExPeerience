describe('Website', function() {
  it('visit splash', function() {
    cy.visit('localhost:3000')
  })
})

describe('Browse - not logged in', function() {
  it('able to visit browse', function() {
    cy.contains('Browse').click()
  })

  it('able to view all projects', function() {
    cy.contains('Filter').click()
    cy.request('GET', '/project')
      .then(res => cy.get('button.list-group-item').its('length').should('eq', res.body.length))
  })

  it('unable to apply to projects when not logged in', function() {
    cy.get('button.list-group-item').each((element) => {
      cy.wrap(element).click()
      cy.get('.btn-warning').should('be.disabled')
    })
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

  it('able to visit browse', function() {
    cy.contains('Browse').click()
  })

  it('able to view all projects', function() {
    cy.contains('Filter').click()
    cy.request('GET', '/project')
      .then(res => cy.get('button.list-group-item').its('length').should('eq', res.body.length))
  })

  it('unable to apply to own project', function() {
    // cy.request('POST', '/user/authenticate', { username: username, password: password })
    //   .then(res => cy.request('POST', '/project/search', { creator: res.body._id }))
    //   .then(res => {
    //     // console.log(res.body)

    //     cy.get('b.list-group-item-heading').each((element) => {
    //       cy.wrap(element).click()

    //     })
    //   })
  })

  it('able to apply to other projects', function() {

  })
})