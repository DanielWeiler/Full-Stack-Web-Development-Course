const notificationReducer = (state = '', action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action
  case 'CLEAR_NOTIFICATION':
    return ''
  default:
    return state
  }
}

let notificationTimeout

export const setNotification = (content, style, time) => {
  // Below is the older way I selected the notification color before using Alert with react bootstrap
/*   let color = ''
  if (style === 'success') {
    color = 'green'
  }
  else if (style === 'error') {
    color = 'red'
  }

  style = {
    color: color,
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  } */

  return async (dispatch) => {

    if (notificationTimeout) {
      clearTimeout(notificationTimeout)
    }
    dispatch({
      type: 'SET_NOTIFICATION',
      content: content,
      style: style
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
