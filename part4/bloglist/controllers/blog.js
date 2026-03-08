const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  }).catch((e) => {
    response.status(400).json({ error: e.message })
  })
})

blogsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  const deletedBlog = await Blog.findByIdAndDelete(id)
  if (deletedBlog) {
    res.status(204).end()
  } else {
    res.status(404).end()
  }
})

blogsRouter.patch('/:id', async (req, res) => {
  const id = req.params.id
  const found = await Blog.findById(id)
  if (!found) {
    return res.status(404).end()
  }
  const updatedBlog = await Blog.findByIdAndUpdate(id, req.body)
  res.json(updatedBlog)
})

module.exports = blogsRouter