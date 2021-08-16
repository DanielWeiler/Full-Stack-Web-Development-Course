import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import BlogForm from './BlogForm'
import Togglable from './Togglable'

const Blogs = () => {
  const blogFormRef = useRef()
  const blogs = useSelector((state) => state.blogs)
  const byLikes = (b1, b2) => b2.likes - b1.likes

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm toggleForm={blogFormRef} />
      </Togglable>

      {blogs.sort(byLikes).map((blog) => (
        <div key={blog.id} style={blogStyle} className="blog">
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  )
}

export default Blogs
