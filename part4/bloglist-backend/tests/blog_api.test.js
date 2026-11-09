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
  await Blog.insertMany(helper.initialBlogs);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

// POST request tests
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

test('a blog without likes defaults to 0', async () => {
  const noLikesBlog = {
    title: 'No likes blog',
    author: 'Andrei',
    url: 'https://example.com/nolikes',
  };

  const response = await api
    .post('/api/blogs')
    .send(noLikesBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

 
  assert.strictEqual(response.body.likes, 0);
});

test('a blog without a title is not added', async () => {
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

test('a blog without a url is not added', async () => {
  const newBlog = {
    title: 'No url blog',
    author: 'Alex',
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

test('a blog can be deleted', async () => {
  const blogsBefore = await helper.blogsInDb();
  const blogstoDelete = blogsBefore[0];

  await api
    .delete(`/api/blogs/${blogstoDelete.id}`)
    .expect(204);

  const blogsAfter = await helper.blogsInDb();
  const ids = blogsAfter.map(n => n.id);

  assert(!ids.includes(blogstoDelete.id));
  assert.strictEqual(blogsAfter.length, helper.initialBlogs.length - 1);
});

test('blogs are identified by id', async () => {
  const response = await api.get('/api/blogs');

  assert(response.body[0].id);
  assert(!response.body[0]._id);
});

after(async () => {
  await mongoose.connection.close();
});