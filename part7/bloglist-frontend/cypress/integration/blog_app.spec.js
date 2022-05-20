describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'tree tester',
      username: 'tree',
      password: 'treepass'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('Login').click()
      cy.get('#username').type('tree')
      cy.get('#password').type('treepass')
      cy.get('#login-button').click()

      cy.contains('tree tester logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('Login').click()
      cy.get('#username').type('nottree')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('Login').click()
      cy.get('#username').type('tree')
      cy.get('#password').type('treepass')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('Create new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('trees.org')
      cy.get('#create').click()
      cy.wait(3000)
      cy.contains('a blog created by cypress')
    })

    describe('With a blog created', function() {
      beforeEach(function() {
        cy.contains('Create new blog').click()
        cy.get('#title').type('a blog created by cypress')
        cy.get('#author').type('cypress')
        cy.get('#url').type('trees.org/1')
        cy.get('#create').click()
        cy.wait(6000)
      })

      it('A user can like a blog', function() {
        //cy.contains('show').click()
        cy.contains('a blog created by cypress').click()
        cy.contains('like').click()
      })

      it('A user who created a blog can delete it', function() {
        //cy.contains('show').click()
        cy.wait(3000)
        cy.contains('a blog created by cypress').click()
        cy.contains('remove').click()
        cy.wait(3000)
      })
    })
  })
})