const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

let notificationTimeout

export const setNotification = (content, time) => {
  return async (dispatch) => {
    
    if (notificationTimeout) {
      clearTimeout(notificationTimeout)
    }
    dispatch({
      type: 'SET_NOTIFICATION',
      data: content,
    })
    notificationTimeout = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      })
    }, time * 1000)
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

export default notificationReducer
