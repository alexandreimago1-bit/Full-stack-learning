const { test, after, beforeEach } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const assert = require('node:assert');
const helper = require('./test_helper');


const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  for (const blog of helper.initialBlogs) {
    const blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Async/await is useful',
    author: 'Andrei',
    url: 'https://example.com/async',
    likes: 5,
  };

  await api 
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map(blog => blog.title);

  assert(titles.includes('Async/await is useful'));

});

test('a blog without title is not added', async () => {
  const newBlog = {
    author: 'Andrei',
    url: 'https://example.com/async',
    likes: 5,
  };

  await api 
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);

  const response = await api.get('/api/blogs');
  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test('a specific blog can be viewed', async () => {
  const blogAtStart = await helper.blogsInDb();
  const blogToView = blogAtStart[0];

  const resultingBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  assert.deepStrictEqual(resultingBlog.body, blogToView);
});

after(async () => {
  await mongoose.connection.close();
});