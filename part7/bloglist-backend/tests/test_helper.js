const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'test blog post',
    author: 'daniel',
    url: 'firstblog',
    likes: 7
  },
  {
    title: 'another test blog post',
    author: 'daniel',
    url: 'secondblog',
    likes: 8
  },
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'will remove soon',
    author: 'daniel',
    url: 'ablog',
    likes: 1 
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, 
  nonExistingId, 
  blogsInDb,
  usersInDb
}