export const getUser = () =>
  JSON.parse(window.localStorage.getItem("loggedBlogappUser"));
export const saveUser = (user) => {
  window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
};
export const removeUser = () => {
  window.localStorage.removeItem("loggedBlogappUser");
};
