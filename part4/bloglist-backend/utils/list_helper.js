const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((maxObj, currentObj) => {
    const currentVal = Number(currentObj.likes);
    const maxVal = Number(maxObj.likes);
    return currentVal > maxVal ? currentObj : maxObj;
  }, blogs[0]);
};

module.exports = {
  totalLikes,
  favoriteBlog,
};