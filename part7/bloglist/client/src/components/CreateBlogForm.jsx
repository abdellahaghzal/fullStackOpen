import { useState } from "react";
import blogService from "../services/blogs";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { useNotifActions } from "../stores/notifStore";
import { useBlogActions } from "../stores/blogStore";
import { useAuth } from "../stores/authStore";

const CreateBlogForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setURL] = useState("");
  const navigate = useNavigate();
  const { notify } = useNotifActions();
  const { addBlog } = useBlogActions();
  const user = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const info = { title, author, url };
      const newBlog = await blogService.create(info);
      newBlog.user = user;
      addBlog(newBlog);
      setTitle("");
      setAuthor("");
      setURL("");
      notify({
        message: `a new blog ${newBlog.title} by ${newBlog.author}`,
        type: "success",
      });
      navigate("/");
    } catch (e) {
      console.error(e.message);
      notify({
        message: e.message,
        type: "error",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>create new</h1>
      <div>
        <TextField
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          label="title"
        />
      </div>
      <div>
        <TextField
          style={{ marginTop: 10 }}
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
          label="author"
        />
      </div>
      <div>
        <TextField
          style={{ marginTop: 10 }}
          value={url}
          onChange={(e) => {
            setURL(e.target.value);
          }}
          label="url"
        />
      </div>
      <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
        create
      </Button>
    </form>
  );
};

export default CreateBlogForm;
