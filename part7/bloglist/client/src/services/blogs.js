import axios from "axios";
import { getUser } from "./persistentUser";
const baseUrl = "/api/blog";

let token = null;
let config = {};
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
  config = {
    headers: { Authorization: token },
  };
};

const user = getUser();
if (user) {
  setToken(user.token);
}

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (info) => {
  const request = axios.post(baseUrl, info, config);
  return request.then((response) => response.data);
};

const like = (blog) => {
  const newLikes = { likes: blog.likes + 1 };
  const request = axios.patch(`${baseUrl}/${blog.id}`, newLikes, config);
  return request.then((response) => response.data);
};

const deleteBlog = (blog) => {
  return axios.delete(`${baseUrl}/${blog.id}`, config);
};

const getComments = (blog) => {
  const request = axios.get(`${baseUrl}/${blog.id}/comments`);
  return request.then((response) => response.data);
};

const addComment = (blog, content) => {
  const request = axios.post(
    `${baseUrl}/${blog.id}/comments`,
    { content },
    config,
  );
  return request.then((response) => response.data);
};

export default {
  getAll,
  setToken,
  create,
  like,
  deleteBlog,
  getComments,
  addComment,
};
