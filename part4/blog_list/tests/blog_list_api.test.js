const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

// The database for testing is initialized 
beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(helper.initialBlogs)
/* previous method:
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  } */
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)

    expect(contents).toContain('test blog post')
  })

  test('unique identifier property is named "id"', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('addition of a new blog', () => {

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'daniel',
      url: 'thirdblog',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    
    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(
      'async/await simplifies making async calls'
    )
  })

  test('if "likes" prop is missing, it defaults to 0', async () => {
    const newBlog = {
      title: 'no likes',
      author: 'daniel',
      url: '0blog'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
      
    // Need to call blogsInDb to get the recently posted blog
    const blogsAtEnd = await helper.blogsInDb()
    expect((blogsAtEnd[blogsAtEnd.length - 1]).likes).toBe(0)
  })

  test('if "title" prop is missing, response is "400 Bad Request"', async () => {
    const newBlog = {
      author: 'daniel',
      url: 'notitle',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('if "url" prop is missing, response is "400 Bad Request"', async () => {
    const newBlog = {
      title: 'no url',
      author: 'daniel',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const contents = blogsAtEnd.map(r => r.title)

    expect(contents).not.toContain(blogToDelete.title)
  })
})

/* describe('updating the info of a blog', () => {
  test('update amount of likes of a blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const blogUpdate = {
      likes: 88
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogUpdate)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect((blogsAtEnd[0]).likes).toBe(88)
  })
}) */

afterAll(() => {
  mongoose.connection.close()
})