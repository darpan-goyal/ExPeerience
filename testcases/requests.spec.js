describe('Website', function() {
  it('visit splash', function() {
    cy.visit('localhost:3000')
  })
})

describe('Requests - not logged in', function() {
  it('unable to visit requests page', function() {
    cy.contains('Requests').should('not.exist')
  })
})

describe('Requests - logged in', function() {
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

  it('able to visit requests', function() {
    cy.contains('Requests').click()
  })

  it('able to view all of one\'s requests', function() {
    cy.request('POST', '/user/authenticate', { username: username, password: password })
      .then(res => cy.request('POST', '/request/search', { creator: res.body._id })
        .then(res => {
          if (res.body.length > 0)
            cy.get('.list-group-item').its('length').should('eq', res.body.length)
          else
            cy.get('.list-group-item').should('not.exist')
        })
      )
  })
})

describe('Requests - logged out', function() {
  it('able to logout', function() {
    cy.contains('Logout').click()
  })

  it('logged out', function() {
    cy.contains('Login').should('be.visible')
  })

  it('unable to view requests because session has ended', function() {
    cy.visit('localhost:3000/requests')
    cy.get('list-group-item').should('not.exist')
  })
})

describe('Requests - apply', function() {
  var username = 'TestUser2'
  var password = 'password'
  var project = /^StudyU$/

  it('login user', function() {
    cy.contains('Login').click()
    cy.get('input').eq(0).type(username)
    cy.get('input').eq(1).type(password)
    cy.get('button').eq(1).click()
    cy.wait(500)
  })

  it('logged in', function() {
    cy.contains('Logout').should('be.visible')
  })

  it('able to apply', function() {
    cy.contains('Browse').click()
    cy.contains('Filter').click()
    cy.get('b.list-group-item-heading').contains(project).click()
    cy.get('.btn-warning').click()
  })

  it('unable to apply after having applied', function() {
    cy.get('.btn-warning').should('be.disabled')
  })

  it('logout user', function() {
    cy.contains('Logout').click()
  })

  it('logged out', function() {
    cy.contains('Login').should('be.visible')
  })
})

describe('Requests - reject', function() {
  var username = 'TestUser1'
  var password = 'password'
  var requestee = 'Test User2'
  var project = /^StudyU$/

  it('login', function() {
    cy.contains('Login').click()
    cy.get('input').eq(0).type(username)
    cy.get('input').eq(1).type(password)
    cy.get('button').eq(1).click()
    cy.wait(500)
  })

  it('logged in', function() {
    cy.contains('Logout').should('be.visible')
  })

  it('reject request', function() {
    cy.contains('Requests').click()
    cy.contains(requestee).parent().parent('.list-group-item').within(() => {
      cy.get('.btn-reject').click()
    })
  })

  it('validate that user wasn\'t added to project', function() {
    cy.contains('Projects').click()
    cy.contains(project).parent().parent('.project-item').within(() => {
      cy.contains('Peers').parent('.other-box').within(()=> {
        cy.wait(1500)
        cy.contains(requestee).should('not.exist')
      })
    })
  })

  it('logout', function() {
    cy.contains('Logout').click()
  })

  it('logged out', function() {
    cy.contains('Login').should('be.visible')
  })
})

describe('Requests - apply again', function() {
  var username = 'TestUser2'
  var password = 'password'
  var project = /^StudyU$/

  it('login user', function() {
    cy.contains('Login').click()
    cy.get('input').eq(0).type(username)
    cy.get('input').eq(1).type(password)
    cy.get('button').eq(1).click()
    cy.wait(500)
  })

  it('logged in', function() {
    cy.contains('Logout').should('be.visible')
  })

  it('able to apply again after being rejected', function() {
    cy.contains('Browse').click()
    cy.contains('Filter').click()
    cy.get('b.list-group-item-heading').contains(project).click()
    cy.get('.btn-warning').should('be.enabled')
    cy.get('.btn-warning').click()
  })

  it('unable to apply after having applied', function() {
    cy.get('.btn-warning').should('be.disabled')
  })

  it('logout user', function() {
    cy.contains('Logout').click()
  })

  it('logged out', function() {
    cy.contains('Login').should('be.visible')
  })
})

describe('Requests - accept', function() {
  var username = 'TestUser1'
  var password = 'password'
  var requestee = 'Test User2'
  var project = /^StudyU$/

  it('login', function() {
    cy.contains('Login').click()
    cy.get('input').eq(0).type(username)
    cy.get('input').eq(1).type(password)
    cy.get('button').eq(1).click()
    cy.wait(500)
  })

  it('logged in', function() {
    cy.contains('Logout').should('be.visible')
  })

  it('accept request', function() {
    cy.contains('Requests').click()
    cy.contains(requestee).parent().parent('.list-group-item').within(() => {
      cy.get('.btn-accept').click()
    })
  })

  it('validate that user was added to project', function() {
    cy.contains('Projects').click()
    cy.contains(project).parent().parent('.project-item').within(() => {
      cy.contains('Peers').parent('.other-box').within(()=> {
        cy.wait(1500)
        cy.contains(requestee).should('exist')
      })
    })
  })

  it('remove user from project', function() {
    cy.contains(project).parent().parent('.project-item').within(() => {
      cy.get('.btn-warning').click()
    })
    cy.get('.css-1hwfws3').eq(3).click().type('{backspace}')
    cy.get('.btn-primary').contains('Save').click()
  })

  it('logout', function() {
    cy.contains('Logout').click()
  })

  it('logged out', function() {
    cy.contains('Login').should('be.visible')
  })
})