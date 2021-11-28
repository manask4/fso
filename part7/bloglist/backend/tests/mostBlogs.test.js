const mostBlogs = require("../utils/list_helper").mostBlogs;

describe("most blogs", () => {
  const blogs = [
    {
      title: "React patterns",
      author: "Michael Chan",
      likes: 7,
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    },
    {
      title: "First class tests",
      author: "Robert C. Martin",
      likes: 10,
    },
    {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      likes: 0,
    },
    {
      title: "Type wars",
      author: "Robert C. Martin",
      likes: 2,
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    },
  ];

  const listWithTopBloggers = [
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    },
    {
      title: "First class tests",
      author: "Robert C. Martin",
      likes: 10,
    },
    {
      title: "Type wars",
      author: "Robert C. Martin",
      likes: 10,
    },
    {
      title: "React patterns",
      author: "Michael Chan",
      likes: 7,
    },
  ];

  test("of empty list is zero", () => {
    expect(mostBlogs([])).toBe(0);
  });

  test("of a single top most blogs by an author from the list is calculated right", () => {
    expect(mostBlogs(blogs)).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });

  test("of multiple top most blogs from the list is calculated right", () => {
    expect(mostBlogs(listWithTopBloggers)).toEqual({
      author: "Robert C. Martin",
      blogs: 2,
    });
  });
});
