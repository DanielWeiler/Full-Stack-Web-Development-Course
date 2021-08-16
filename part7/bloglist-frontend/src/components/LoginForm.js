import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/logInReducer'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(
        setUser({
          username,
          password,
        })
      )
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 'error', 5))
    }
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Log In</h2>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          log in
        </button>
      </form>
    </div>
  )
}

export default LoginForm
