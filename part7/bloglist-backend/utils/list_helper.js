const _ = require('lodash')

const dummy = (blogs) => {
  return blogs.length === 0 ? 1 : 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  let mostLikedBlog = {
    likes: 0,
  }
  blogs.map((blog) =>
    blog.likes > mostLikedBlog.likes ? (mostLikedBlog = blog) : null
  )
  mostLikedBlog = {
    title: mostLikedBlog.title,
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes,
  }
  return mostLikedBlog
}

const mostBlogs = (blogs) => {
  const blogsByAuthor = _.groupBy(blogs, 'author')
  let mostBlogs = 0
  let authorName = ''
  for (const [author, blogs] of Object.entries(blogsByAuthor)) {
    if (blogs.length > mostBlogs) {
      mostBlogs = blogs.length
      authorName = author
    }
  }
  mostBlogs = {
    author: authorName,
    blogs: mostBlogs,
  }
  return mostBlogs
}

const mostLikes = (blogs) => {
  const blogsByAuthor = _.groupBy(blogs, 'author')
  const authorsAndLikes = _.mapValues(blogsByAuthor, totalLikes)
  const mostLikedAuthor = Object.entries(authorsAndLikes).reduce((a, b) =>
    a[1] > b[1] ? a : b
  )
  return {
    author: mostLikedAuthor[0],
    likes: mostLikedAuthor[1],
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
