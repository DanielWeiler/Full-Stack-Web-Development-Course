import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/logInReducer'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(
      setUser({
        username,
        password,
      })
    )
    setUsername('')
    setPassword('')
  }

  const margin = {
    marginTop: 10,
  }

  return (
    <div>
      <h2>Log In</h2>

      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            id="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button id="login-button" variant="primary" type="submit" style={margin}>
            Login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm
