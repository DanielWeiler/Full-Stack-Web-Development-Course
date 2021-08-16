import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const Blog = ({ user }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`)) {
      dispatch(deleteBlog(blog))
    }
    history.push('/')
  }

  const id = useParams().id
  const blog = useSelector((state) => state.blogs).find((blog) =>
    blog.id === id ? blog : null
  )
  if (!blog) {
    return null
  }
  return (
    <div>
      <h2>
        {blog.title} - {blog.author}
      </h2>
      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>
      <p>
        {blog.likes} likes
        <button onClick={handleLike}>like</button>
      </p>
      <p>added by {blog.user.username}</p>
      {user.username === blog.user.username ? (
        <button onClick={handleDelete}>remove</button>
      ) : null}
    </div>
  )
}

export default Blog
