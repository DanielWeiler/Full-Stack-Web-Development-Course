import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { logOutUser, setUserFromStorage } from './reducers/logInReducer'

import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import './index.css'
import Menu from './components/Menu'
import Users from './components/Users'
import UserBlogs from './components/UserBlogs'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    // Check to see if user details of a logged-in user can already be found on the local storage
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      dispatch(setUserFromStorage(loggedUserJSON))
    }
  }, [dispatch])

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logOutUser())
  }

  const user = useSelector((state) => state.user)

  return (
    <Router>
      <div>
        <Menu />
        <h1>Blogs</h1>
        {user !== null ? (
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>log out</button>
          </p>
        ) : null}
        <Notification />
        <Switch>
          <Route path="/blogs/:id">
            <Blog user={user}/>
          </Route>
          <Route path="/users/:id">
            <UserBlogs />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            {user === null ? (
              <LoginForm />
            ) : (
              <Blogs />
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
