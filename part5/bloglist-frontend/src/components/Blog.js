import React, { useState } from 'react'

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

const Blog = ({ blog, user, updateBlog, removeBlog }) => {
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
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    updateBlog(blog.id, updatedBlog)
  }

  const handleDelete = () => {
    removeBlog(blog)
  }

  return (
    <div style={blogStyle}>
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
