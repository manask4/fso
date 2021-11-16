import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import BlogForm from "./BlogForm";

test("Testing create blog form", () => {
  const blogHandler = jest.fn();
  const toggleHandler = jest.fn();

  const component = render(
    <BlogForm onBlogCreate={blogHandler} onToggle={toggleHandler} />
  );

  const title = component.container.querySelector("#title");
  const author = component.container.querySelector("#author");
  const url = component.container.querySelector("#url");
  const form = component.container.querySelector("form");

  fireEvent.change(title, {
    target: { value: "Game of Thrones" },
  });

  fireEvent.change(author, {
    target: { value: "George R.R. Martin" },
  });

  fireEvent.change(url, {
    target: { value: "www.google.com" },
  });

  fireEvent.submit(form);

  expect(blogHandler.mock.calls).toHaveLength(1);
  expect(blogHandler.mock.calls[0][0].title).toBe("Game of Thrones");
  expect(blogHandler.mock.calls[0][0].author).toBe("George R.R. Martin");
  expect(blogHandler.mock.calls[0][0].url).toBe("www.google.com");
});
