import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { logOutUser } from '../reducers/logInReducer'
import { Navbar, Nav, Button } from 'react-bootstrap'

const Menu = ({ user }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logOutUser())
    history.push('/')
  }

  const padding = {
    paddingRight: 10,
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">
              blogs
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">
              users
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            {user ? (
              <div>
                <em style={padding}>{user.name} logged in</em>
                <Button onClick={handleLogout}>log out</Button>
              </div>
            ) : null }
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu
