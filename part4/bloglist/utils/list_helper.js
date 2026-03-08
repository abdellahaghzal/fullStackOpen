const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return (
    blogs.reduce((likes, blog) => {
      return likes + blog.likes
    }, 0)
  )
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  return blogs.reduce(
    (max, blog) => blog.likes > max.likes ? blog : max
  )
}


const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const authorsAndBlogs = _.countBy(blogs, 'author')
  const authorWithMostBlogs = _.reduce(authorsAndBlogs, (res, val, key) => {
    return (
      res.blogs > val
        ? res
        : {author: key, blogs: val}
    )
  }, {author: null, blogs: -1})
  return authorWithMostBlogs
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const authorsAndLikes = _.groupBy(blogs, 'author')
  const authorWithMostLikes = _.reduce(authorsAndLikes, (res, val, key) => {
    const likes = val.reduce((totalLikes, blog) => totalLikes + blog.likes, 0)
    return (
      res.likes > likes
        ? res
        : {author: key, likes: likes}
    )
  }, {author: null, likes: -1})
  return authorWithMostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}