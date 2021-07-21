const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map((blog) => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  if (body.title === '' || body.url === '') {
    return response.status(403).json({ error: 'Title and url are required' })
  }

  const user = await User.findById(body.userId)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    // If likes is defined, then it is likes; if likes is not defined then it is 0.
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog.toJSON())
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
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
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
    }

    const blogUpdate = await Blog.findByIdAndUpdate(
      request.params.id,
      updatedBlogData,
      { new: true }
    )

    return response.json(blogUpdate.toJSON())
  }
})

module.exports = blogsRouter
