import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import CommentForm from './CommentForm'

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
        <Button onClick={handleLike} style={{ marginLeft: 10 }}>
          like
        </Button>
      </p>
      <p>Added by {blog.user.username}</p>
      {user.username === blog.user.username ? (
        <Button onClick={handleDelete} style={{ marginBottom: 10 }}>remove</Button>
      ) : null}
      <h3>Comments</h3>
      <CommentForm blog={blog} />
      <ul>
        {blog.comments.map((comment, index) => (
          /* whatever is in that second position after the comma is the index of the item in the array */
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
