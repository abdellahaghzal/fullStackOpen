import { create } from "zustand";
import blogService from "../services/blogs";

const useBlogStore = create((set) => ({
  blogs: [],
  actions: {
    initialize: () => {
      blogService.getAll().then((blogs) => set(() => ({ blogs })));
    },
    addBlog: (newBlog) =>
      set((state) => ({ blogs: state.blogs.concat(newBlog) })),
    likeBlog: (id) =>
      set((state) => {
        const newBlogs = state.blogs.map((blog) => {
          if (blog.id === id) {
            return { ...blog, likes: blog.likes + 1 };
          }
          return blog;
        });
        return { blogs: newBlogs };
      }),
    delBlog: (id) =>
      set((state) => {
        const newBlogs = state.blogs.filter((blog) => blog.id !== id);
        return { blogs: newBlogs };
      }),
  },
}));

export const useBlogs = () => useBlogStore((state) => state.blogs);
export const useBlogActions = () => useBlogStore((state) => state.actions);
