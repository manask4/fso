import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = newToken === null ? newToken : `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  let response = await axios.post(baseUrl, newBlog, config);
  response.data.user = {
    id: response.data.user,
  };
  return response;
};

const update = async (id, blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${id}`, blog, config);
  return response;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response;
};

const addComment = async (id, comment) => {
  const config = {
    headers: { Authorization: token },
  };
  const payload = { comment };
  const response = await axios.post(
    `${baseUrl}/${id}/comments`,
    payload,
    config
  );
  return response;
};

const services = { setToken, getAll, create, update, remove, addComment };
export default services;
