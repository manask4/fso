const mostLikes = require("../utils/list_helper").mostLikes;

describe("most likes", () => {
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
      likes: 8,
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
    expect(mostLikes([])).toBe(0);
  });

  test("of a single max number of likes for an author is calculated right", () => {
    expect(mostLikes(blogs)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });

  test("of multiple max number of likes for authors is calculated right", () => {
    expect(mostLikes(listWithTopBloggers)).toEqual({
      author: "Robert C. Martin",
      likes: 20,
    });
  });
});
