describe('Website', function() {
  it('visit splash', function() {
    cy.visit('localhost:3000')
  })
})

describe('Browse - general', function() {
  it('able to visit browse', function() {
    cy.contains('Browse').click()
  })

  it('able to view all projects', function() {
    cy.contains('Filter').click()
    cy.request('GET', '/project')
      .then(res => cy.get('button.list-group-item').its('length').should('eq', res.body.length))
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

  it('able to filter projects by college', function() {
    cy.reload()
    cy.request('GET', '/college')
      .then(res => res.body.forEach(college => {
        cy.get('.css-1hwfws3').eq(0).click()
        cy.get('.css-4ljt47-MenuList').children().contains(college.name).click()
        cy.contains('Filter').click()
        cy.request('POST', '/project/search', { college: college._id })
          .then(res => {
            if (res.body.length > 0)
              cy.get('button.list-group-item').its('length').should('eq', res.body.length)
            else
              cy.get('button.list-group-item').should('not.exist')
          })
        cy.contains('Filter').click()
      }))
  })

  it('able to filter projects by major', function() {
    cy.reload()
    cy.request('GET', '/major')
    .then(res => res.body.forEach(major => {
      cy.get('.css-1hwfws3').eq(1).click()
      cy.get('.css-4ljt47-MenuList').children().contains(major.name).click()
      cy.contains('Filter').click()
      cy.request('POST', '/project/search', { major: major._id })
        .then(res => {
          if (res.body.length > 0)
            cy.get('button.list-group-item').its('length').should('eq', res.body.length)
          else
            cy.get('button.list-group-item').should('not.exist')
        })
      cy.contains('Filter').click()
    }))
  })

  it('able to filter projects by skills', function() {
    cy.reload()
    cy.request('GET', '/skill')
      .then(res => res.body.forEach(skill => {
        cy.get('.css-1hwfws3').eq(2).click().type('{backspace}')
        cy.get('.css-1hwfws3').eq(2).click()
        cy.get('.css-4ljt47-MenuList').children().contains(skill.name).click()
        cy.contains('Filter').click()
        cy.request('POST', '/project/search', { skills: skill._id })
          .then(res => {
            if (res.body.length > 0)
              cy.get('button.list-group-item').its('length').should('eq', res.body.length)
            else
              cy.get('button.list-group-item').should('not.exist')
          })
        cy.contains('Filter').click()
      }))
  })

  it('able to filter projects by a variety of filters', function() {
    cy.reload()
    cy.request('GET', '/college')
      .then(res1 => cy.request('GET', '/major')
        .then(res2 => cy.request('GET', '/skill')
          .then(res3 => {
            var college = res1.body.find(college => college.name === "San Jose State University")
            var major = res2.body.find(major => major.name === "Computer Science")
            var skill = res3.body.find(skill => skill.name === "JavaScript")
            
            cy.get('.css-1hwfws3').eq(0).click()
            cy.get('.css-4ljt47-MenuList').children().contains(college.name).click()
            cy.get('.css-1hwfws3').eq(1).click()
            cy.get('.css-4ljt47-MenuList').children().contains(major.name).click()
            cy.contains('Filter').click()

            cy.request('POST', '/project/search', { college: college._id, major: major._id })
              .then(res => {
                if (res.body.length > 0)
                  cy.get('button.list-group-item').its('length').should('eq', res.body.length)
                else
                  cy.get('button.list-group-item').should('not.exist')
              })

            cy.contains('Filter').click()
            cy.get('.css-1hwfws3').eq(2).click()
            cy.get('.css-4ljt47-MenuList').children().contains(skill.name).click()
            cy.contains('Filter').click()

            cy.request('POST', '/project/search', { college: college._id, major: major._id, skills: skill._id })
              .then(res => {
                if (res.body.length > 0)
                  cy.get('button.list-group-item').its('length').should('eq', res.body.length)
                else
                  cy.get('button.list-group-item').should('not.exist')
              })
          })
        )
      )
  })
})

describe('Browse - not logged in', function() {
  it('not logged in', function() {
    cy.contains('Login').should('be.visible').click()
  })

  it('able to visit browse', function() {
    cy.contains('Browse').click()
  })

  it('unable to apply to any projects', function() {
    cy.reload()
    cy.contains('Filter').click()
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

  it('logged in', function() {
    cy.contains('Logout').should('be.visible')
  })

  it('able to visit browse', function() {
    cy.contains('Browse').click()
  })

  it('unable to apply to own projects', function() {
    cy.contains('Filter').click()
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
})