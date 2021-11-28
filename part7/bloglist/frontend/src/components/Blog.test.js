import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("Testing Blog component", () => {
  const testBlog = {
    title: "Get a job",
    author: "Drake Mathews",
    url: "https://www.google.com",
    likes: 10,
  };

  let component;
  const likeMockHandler = jest.fn();
  const deleteMockHandler = jest.fn();
  const canDelete = false;

  beforeEach(() => {
    component = render(
      <Blog
        blog={testBlog}
        handleLikes={likeMockHandler}
        handleDelete={deleteMockHandler}
        canDelete={canDelete}
      />
    );
  });

  test("renders blog title and author", () => {
    const titleDiv = component.container.querySelector(".blog-title");
    expect(titleDiv).toHaveTextContent(
      `${testBlog.title} - ${testBlog.author}`
    );

    const details = component.container.querySelector(".blog-details");
    expect(details).toBeNull();
  });

  test("render blog url and likes when view button clicked", () => {
    const viewButton = component.getByText("View");
    fireEvent.click(viewButton);
    const details = component.container.querySelector(".blog-details");
    expect(details).toBeDefined();
    expect(details).toHaveTextContent(testBlog.url);
    expect(details).toHaveTextContent(testBlog.likes);
  });

  test("if like button is clicked twice, event handler is called twice", () => {
    const viewButton = component.getByText("View");
    fireEvent.click(viewButton);

    const likeButton = component.getByText("Like");
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(likeMockHandler.mock.calls).toHaveLength(2);
  });
});
