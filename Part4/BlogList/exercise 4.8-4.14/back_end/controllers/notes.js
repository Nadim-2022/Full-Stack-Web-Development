const nextrout = require('express').Router()

const Blog = require('../models/note')
nextrout.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
  })
  
nextrout.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body

  if (!title || !url) {
    return response.status(400).json({ error: 'Title and URL are required' })
  }

  const blog = new Blog({ title, author, url, likes })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})
nextrout.delete('/:id', async (request, response) => {
  const blog = await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})
nextrout.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body
  const blog = { title, author, url, likes }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(204).json(updatedBlog)
})

  module.exports = nextrout