import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'LIKE_BLOG':
    return state.map((blog) =>
      blog.id !== action.data.id ? blog : action.data
    )
  case 'NEW_COMMENT':
    return state.map((blog) =>
      blog.id !== action.data.id ? blog : action.data
    )
  case 'DELETE_BLOG':
    return state.filter((blog) => blog.id !== action.data.id)
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    const likedBlog = await blogService.update(blog.id, updatedBlog)
    dispatch({
      type: 'LIKE_BLOG',
      data: likedBlog,
    })
  }
}

export const addComment = (blog, content) => {
  return async (dispatch) => {
    // Use concat instead of push to add a comment so that a new array and a new object are created (instead of pushing to the original array) to make sure state is not mutated directly
    const newComment = blog.comments.concat(content)
    const updatedBlog = { ...blog, comments: newComment }
    const blogWithComment = await blogService.update(blog.id, updatedBlog)
    dispatch({
      type: 'NEW_COMMENT',
      data: blogWithComment,
    })
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id)
    dispatch({
      type: 'DELETE_BLOG',
      data: blog,
    })
  }
}

export default blogReducer
