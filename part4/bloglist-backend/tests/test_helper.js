const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Alex',
    url: 'https://example.com/html',
    likes: 5,
  },
  {
    title: 'Understanding React',
    author: 'Sam',
    url: 'https://example.com/react',
    likes: 10,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ 
    title: 'WillBeRemoved', 
    author: 'WillBeRemoved',
    url: 'https://willbe.com/removed',
    likes: 10,
  });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON()); 
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};