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
    cy.contains('Log In')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('tree')
      cy.get('#password').type('treepass')
      cy.get('#login-button').click()

      cy.contains('tree tester logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('nottree')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('log in').click()
      cy.get('#username').type('tree')
      cy.get('#password').type('treepass')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('trees.org')
      cy.get('#create').click()
      cy.contains('a blog created by cypress')
    })

    describe('With a blog created', function() {
      beforeEach(function() {
        cy.contains('create new blog').click()
        cy.get('#title').type('a blog created by cypress')
        cy.get('#author').type('cypress')
        cy.get('#url').type('trees.org/1')
        cy.get('#create').click()
      })

      it('A user can like a blog', function() {
        cy.contains('show').click()
        cy.contains('like').click()
      })

      it('A user who created a blog can delete it', function() {
        cy.contains('show').click()
        cy.contains('remove').click()
        cy.wait(3000)
      })
    })

    describe('With several blogs', function() {
      beforeEach(function() {
        cy.contains('create new blog').click()
        cy.get('#title').type('a blog created by cypress')
        cy.get('#author').type('cypress')
        cy.get('#url').type('trees.org/1')
        cy.get('#create').click()
        cy.wait(3000)

        cy.contains('create new blog').click()
        cy.get('#title').type('another cypress blog')
        cy.get('#author').type('cypress')
        cy.get('#url').type('trees.org/2')
        cy.get('#create').click()
        cy.wait(3000)

        cy.contains('create new blog').click()
        cy.get('#title').type('TREES')
        cy.get('#author').type('cypress')
        cy.get('#url').type('trees.org/3')
        cy.get('#create').click()
        cy.wait(3000)
      })

      it('they are ordered according to likes with the blog with the most likes being first', function() {
        cy.get('.blog').contains('TREES')
          .contains('show').click()
        cy.contains('like').click()
        cy.wait(3000)
        cy.contains('like').click()
        cy.wait(3000)
        cy.contains('like').click()
        cy.wait(3000)
        cy.contains('hide').click()

        cy.get('.blog').contains('another cypress blog')
          .contains('show').click()
        cy.contains('like').click()
        cy.wait(3000)
        cy.contains('like').click()

        cy.wait(5000)
        cy.get('.blog').eq(0).contains('TREES')
        cy.get('.blog').eq(1).contains('another cypress blog')
        cy.get('.blog').eq(2).contains('a blog created by cypress')
      })
    })
  })
})