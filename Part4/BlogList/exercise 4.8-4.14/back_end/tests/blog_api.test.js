const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('Blogs are returned as json', async () => {
  const response = await api.get('/api/blogs')
  expect(response.header['content-type']).toContain('application/json');
}, 100000)
  
test('Blog post have "id" property', async () => { 
  const response = await api.get('/api/blogs')
 for (const blog of response.body){
    console.log(blog.id)
    expect(blog.id).toBeDefined()
 }
}, 100000)

test('A valid blog can be added ', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'Test URL',
    likes: 0
  }
  const response = await api.post('/api/blogs').send(newBlog)
  const blogs = await api.get('/api/blogs')
  expect(blogs.body[8].title).toBe('Test Blog')
}, 100000)

test('A blog without likes property will default to 0', async () => {
  const newBlog = {
    title: 'Test Blog Like',
    author: 'Test Author',
    url: 'Test URL'
  }
  const response = await api.post('/api/blogs').send(newBlog)
  const blogs = await api.get('/api/blogs')
  expect(blogs.body[9].likes).toBe(0)
}, 100000)

test('A blog without title and url will return 400', async () => {
  const newBlog = {
    author: 'Test Author',
    likes: 0
  }
  const response = await api.post('/api/blogs').send(newBlog)
  expect(response.status).toBe(400)
}, 100000)

test('A blog can be deleted', async () => {
  const blogs = await api.get('/api/blogs')
  const blogToDelete = blogs.body[0]
  const response = await api.delete(`/api/blogs/${blogToDelete.id}`)
  expect(response.status).toBe(204)
}, 100000)
test('A blog can be updated', async () => {
  const blogs = await api.get('/api/blogs')
  const blogToUpdate = blogs.body[0]
  const newBlog = {
    title: 'Test Blog ',

  }
  const response = await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog)
  expect(response.status).toBe(204)
}, 100000)

    

afterAll(async () => {
  await mongoose.connection.close()
})