const jwt = require('jsonwebtoken')
const nextrout = require('express').Router()
const User = require('../models/user')


const Blog = require('../models/note')
nextrout.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
  })
  
nextrout.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user =  request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })

  const savedNote = await blog.save()
  user.blogs = user.blogs.concat(savedNote._id)
  await user.save()
  
  response.json(savedNote)
})
nextrout.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (!request.token) {
    return response.status(401).json({ error: 'token missing' })
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id || blog.user.toString() !== decodedToken.id) {
    return response.status(401).json({ error: 'invalid token or unauthorized operation' })
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})
nextrout.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body
  const blog = { title, author, url, likes }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(204).json(updatedBlog)
})

  module.exports = nextrout