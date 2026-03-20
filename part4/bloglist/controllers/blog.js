const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { SECRET } = require('../utils/config')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { password: false })
  response.json(blogs)
})

blogsRouter.post('/', async (req, res, next) => {
  try {
    const user = req.user
    if (!user) {
      return res.status(400).json({ error: 'UserId missing or not valid' })
    }
    req.body.user = user.id
    const blog = new Blog(req.body)
    const result = await blog.save()
    res.status(201).json(result)
  } catch (e) {
    next(e)
  }
})

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token invalid' })
    }
    const id = req.params.id
    const blogToDelete = await Blog.findById(id)
    if (!blogToDelete) {
      res.status(404).end()
    }
    if (decodedToken.id !== blogToDelete.user.toString()) {
      return res.status(401).json({ error: 'token invalid' })
    }
    const deletedBlog = await Blog.findByIdAndDelete(id)
    if (deletedBlog) {
      res.status(204).end()
    } else {
      res.status(404).end()
    }
  } catch (e) {
    next(e)
  }
})

blogsRouter.patch('/:id', async (req, res) => {
  const id = req.params.id
  const found = await Blog.findById(id)
  if (!found) {
    return res.status(404).end()
  }
  const updatedBlog = await Blog.findByIdAndUpdate(id, req.body)
  res.json(await Blog.findById(id))
})

module.exports = blogsRouter