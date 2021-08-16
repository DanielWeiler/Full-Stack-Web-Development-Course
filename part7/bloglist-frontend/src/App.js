import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { logOutUser, setUserFromStorage } from './reducers/logInReducer'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
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

  const blogFormRef = useRef()

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
  const blogs = useSelector((state) => state.blogs)
  const byLikes = (b1, b2) => b2.likes - b1.likes

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
              <div>
                <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                  <BlogForm toggleForm={blogFormRef} />
                </Togglable>

                {blogs.sort(byLikes).map((blog) => (
                  <Blog key={blog.id} blog={blog} user={user.username} />
                ))}
              </div>
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
