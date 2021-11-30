import blogService from "../services/blogs";
import { flashNotification } from "./notificationReducer";
import { toggleFormDisplay } from "./blogFormReducer";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return action.data;
    case "ADD_BLOG":
      return [...state, action.data];
    case "LIKE_BLOG":
      return state.map((item) =>
        item.id === action.data.id ? { ...item, likes: item.likes + 1 } : item
      );
    case "DELETE_BLOG":
      return state.filter((item) => item.id !== action.data);
    case "ADD_BLOG_COMMENT":
      return state.map((item) =>
        item.id === action.data.id ? action.data : item
      );
    default:
      return state;
  }
};

export const initBlogs = () => {
  return async (dispatch) => {
    const data = await blogService.getAll();
    dispatch({
      type: "INIT_BLOGS",
      data,
    });
  };
};

export const addBlog = (blog) => {
  return async (dispatch) => {
    const response = await blogService.create(blog);
    if (response.status === 201) {
      dispatch({
        type: "ADD_BLOG",
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
      dispatch({
        type: "LIKE_BLOG",
        data: blog,
      });
    }
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    const response = await blogService.remove(id);
    if (response.status === 204) {
      dispatch({
        type: "DELETE_BLOG",
        data: id,
      });
    }
  };
};

export const addBlogComment = (id, comment) => {
  return async (dispatch) => {
    const response = await blogService.addComment(id, comment);
    if (response.status === 200) {
      dispatch({
        type: "ADD_BLOG_COMMENT",
        data: response.data,
      });
    }
  };
};

export default reducer;
