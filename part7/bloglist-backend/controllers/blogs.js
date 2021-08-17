const blogsRouter = require('express').Router()
//const { findById } = require('../models/blog')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs.map((blog) => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  if (!request.token) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    // If likes is defined, then it is likes; if likes is not defined then it is 0.
    user: user._id,
    comments: body.comments
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  const populatedBlog = await Blog.findById(savedBlog._id).populate('user', {
    username: 1,
    name: 1,
  })

  response.json(populatedBlog.toJSON())
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  if (!request.token) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  // blog.user is an object so it must be parsed into a string to be compared
  if (blog.user.toString() !== user._id.toString()) {
    return response
      .status(403)
      .json({ error: 'Only the blog creator may delete the blog' })
  }
  await blog.remove()
  return response.status(204).json({ message: 'Blog deleted' })
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    if (body.title === '' || body.url === '') {
      return response.status(403).json({ error: 'Title and url are required' })
    }

    const updatedBlogData = {
      title: body.title || blog.title,
      author: body.author || blog.author,
      url: body.url || blog.url,
      likes: body.likes || blog.likes,
      comments: body.comments || blog.comments
    }

    const blogUpdate = await Blog.findByIdAndUpdate(
      request.params.id,
      updatedBlogData,
      { new: true }
    ).populate('user', {
      username: 1,
      name: 1,
    })
    return response.json(blogUpdate.toJSON())
  }
})

module.exports = blogsRouter
