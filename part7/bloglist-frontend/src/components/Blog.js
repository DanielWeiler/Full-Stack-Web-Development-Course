import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const Details = ({ blog, user, handleLike, handleDelete }) => (
  <div>
    <p>{blog.url}</p>
    <p>
      {blog.likes}
      <button onClick={handleLike}>like</button>
    </p>
    <p>{blog.user.username}</p>
    {user !== blog.user.username ? null : (
      <button onClick={handleDelete}>remove</button>
    )}
  </div>
)

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()

  const [detailsVisible, setDetailsVisible] = useState(false)
  const [toggle, setToggle] = useState('show')

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible)
    if (toggle === 'show') {
      setToggle('hide')
    } else {
      setToggle('show')
    }
  }

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`)) {
      dispatch(deleteBlog(blog))
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={toggleVisibility} toggle={toggle}>
          {toggle}
        </button>
      </div>
      {!detailsVisible ? null : (
        <Details
          blog={blog}
          user={user}
          handleLike={handleLike}
          handleDelete={handleDelete}
        />
      )}
    </div>
  )
}

export default Blog
