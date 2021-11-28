import blogService from "../services/blogs";
import { flashNotification } from "./notificationReducer";
import { toggleFormDisplay } from "./blogFormReducer";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INIT":
      return action.data;
    case "ADD":
      return [...state, action.data];
    default:
      return state;
  }
};

export const initBlogs = () => {
  return async (dispatch) => {
    const data = await blogService.getAll().then((blogs) => {
      return blogs.sort((first, second) => second.likes - first.likes);
    });
    dispatch({
      type: "INIT",
      data,
    });
  };
};

export const addBlog = (blog) => {
  return async (dispatch) => {
    const response = await blogService.create(blog);
    if (response.status === 201) {
      dispatch({
        type: "ADD",
        data: response.data,
      });
      dispatch(toggleFormDisplay());
      dispatch(
        flashNotification({ text: "New blog added!", type: "success", time: 3 })
      );
    }
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const payload = { likes: blog.likes + 1 };
    const response = await blogService.update(blog.id, payload);
    if (response.status === 200) {
      dispatch(initBlogs());
    }
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    const response = await blogService.remove(id);
    if (response.status === 204) {
      dispatch(initBlogs());
    }
  };
};

export default reducer;
