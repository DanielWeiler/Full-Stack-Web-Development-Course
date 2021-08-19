import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const logInReducer = (state = initializeUser(), action) => {
  switch(action.type) {
  case 'LOG_IN_FROM_LOCAL_STORAGE':
    return action.data
  case 'LOG_IN':
    return action.data
  case 'LOG_OUT':
    return null
  default:
    return state
  }
}

const initializeUser = () => {
  return JSON.parse(window.localStorage.getItem('loggedBlogappUser') || null)
}

export const setUserFromStorage = (loggedUserJSON) => {
  const user = JSON.parse(loggedUserJSON || null)
  blogService.setToken(user.token)
  return {
    type: 'LOG_IN_FROM_LOCAL_STORAGE',
    data: user
  }
}

export const setUser = (credentials) => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      // Stores the user details to the local storage
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(setNotification(`Welcome ${credentials.username}`, 'success', 5))
      dispatch({
        type: 'LOG_IN',
        data: user
      })
    } catch (error) {
      dispatch(setNotification('wrong username or password', 'warning', 5))
    }

  }
}

export const logOutUser = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch({
      type: 'LOG_OUT'
    })
  }
}

export default logInReducer