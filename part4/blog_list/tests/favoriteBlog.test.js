const favoriteBlog = require("../utils/list_helper").favoriteBlog;

describe("favorite blog", () => {
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
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      likes: 0,
    },
    {
      title: "Type wars",
      author: "Robert C. Martin",
      likes: 2,
    },
  ];

  const listWithManyFavorites = [
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
      title: "Type wars",
      author: "Robert C. Martin",
      likes: 10,
    },
  ];

  test("of empty list is zero", () => {
    expect(favoriteBlog([])).toBe(0);
  });

  test("of a single top favorite from the list is calculated right", () => {
    expect(favoriteBlog(blogs)).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });

  test("of many top favorites from the list is calculated right", () => {
    expect(favoriteBlog(listWithManyFavorites)).toEqual({
      title: "Type wars",
      author: "Robert C. Martin",
      likes: 10,
    });
  });
});
