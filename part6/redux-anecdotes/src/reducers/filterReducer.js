const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE_FILTER':
      return action.data
    default:
      return state
  }
}

export const filterData = (content) => {
    return {
      type: 'CHANGE_FILTER',
      data: content,
    }
  }

export default filterReducer
