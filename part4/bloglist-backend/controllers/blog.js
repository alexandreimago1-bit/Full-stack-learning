const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogRouter.post('/', async (req ,res) => {
  const body = req.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  const savedBlog = await blog.save();

  res.status(201).json(savedBlog);
});

blogRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

blogRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

blogRouter.put('/:id', async (req, res) => {
  const { title, author, url, likes } = req.body;
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(404).end();
  }
  blog.title = title;
  blog.author = author;
  blog.url = url;
  blog.likes = likes;

  const savedBlog = await blog.save();
  return res.json(savedBlog);
  
});

module.exports = blogRouter;