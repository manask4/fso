const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const reducer = (sum, item) => sum + item.likes;
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((current, prev) =>
        current.likes > prev.likes ? current : prev
      );
};

const mostBlogs = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((acc, blog) => {
        const count = blogs.filter((item) => item.author === blog.author)
          .length;
        return acc.blogs > count ? acc : { author: blog.author, blogs: count };
      });
};

const mostLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((acc, blog) => {
        const totalLikes = blogs
          .filter((item) => item.author === blog.author)
          .reduce((sum, item) => {
            return sum + item.likes;
          }, 0);
        return acc.likes > totalLikes
          ? acc
          : { author: blog.author, likes: totalLikes };
      });
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
