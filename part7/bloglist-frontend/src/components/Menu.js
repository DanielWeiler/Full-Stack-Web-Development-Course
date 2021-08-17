import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { logOutUser } from '../reducers/logInReducer'

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
    <div style={{ display:'flex', flexDirection:'row' }}>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {user !== null ? (
        <div>
          {user.name} logged in
          <button onClick={handleLogout}>log out</button>
        </div>
      ) : null}
    </div>
  )
}

export default Menu
