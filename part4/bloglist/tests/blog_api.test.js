const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

const newBlog = {
  title: "New",
  author: "newAuthor",
  url: "someURL",
  likes: 69,
}

const newBlogNoLikes = {
  title: "New",
  author: "newAuthor",
  url: "someURL",
}

const newBlogNoTitle = {
  author: "newAuthor",
  url: "someURL",
  likes: 69
}

const newBlogNoURL = {
  title: "New",
  author: "newAuthor",
  likes: 69,
}

describe('blog api', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
  })
  
  test('blogs are returned as json', async () => {
    const res = await api
      .get('/api/blog')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    assert.strictEqual(res.body.length, initialBlogs.length)
  })
  
  test('unique identifier named id', async () => {
    const res = await api.get('/api/blog')
    assert.notStrictEqual(res.body[0].id, undefined)
  })
  
  test('POST req on blog are working correctly', async () => {
    const newBlogRes = await api
      .post('/api/blog')
      .send(newBlog)
      .expect(201)
      const blogsRes = await api.get('/api/blog')
      const found = blogsRes.body.find((blog) => blog.id === newBlogRes.body.id)
      assert.deepStrictEqual(newBlogRes.body, found)
  })
  
  test('if likes missing default to 0', async () => {
    const newBlogRes = await api
      .post('/api/blog')
      .send(newBlogNoLikes)
      .expect(201)
    const blogsRes = await api.get('/api/blog')
    const found = blogsRes.body.find((blog) => blog.id === newBlogRes.body.id)
    assert.strictEqual(found.likes, 0)
  })
  
  test('if title or url is missing then 400', async () => {
    await api
      .post('/api/blog')
      .send(newBlogNoTitle)
      .expect(400)
    await api
      .post('/api/blog')
      .send(newBlogNoURL)
      .expect(400)
  })
  
  test('DELETE req on blog/id are working correctly', async () => {
    await api
      .delete('/api/blog/' + initialBlogs[0]._id)
      .expect(204)
    await api
      .delete('/api/blog/' + initialBlogs[0]._id)
      .expect(404)
  })
  
  test('PATCH req on blog/id are working correctly', async () => {
    const newLikes = 999
    const res = await api
      .patch('/api/blog/' + initialBlogs[0]._id)
      .send({likes: newLikes})
      .expect(200)
    const blogsRes = await api.get('/api/blog')
    const found = blogsRes.body.find((blog) => blog.id === initialBlogs[0]._id)
    assert.strictEqual(found.likes, newLikes)
  })
})

after(async () => {
  await mongoose.connection.close()
})