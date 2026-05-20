import blogService from "../services/blogs";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNotifActions } from "../stores/notifStore";
import { useBlogActions } from "../stores/blogStore";
import { useAuth } from "../stores/authStore";
import { useEffect, useState } from "react";

const Blog = ({ blog }) => {
  const navigate = useNavigate();
  const user = useAuth();
  const { likeBlog, delBlog } = useBlogActions();
  const { notify } = useNotifActions();
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!blog) return;
    blogService.getComments(blog).then((loadedComments) => {
      setComments(loadedComments);
    });
  }, [blog]);

  if (!blog) {
    return null;
  }

  const handleLike = async () => {
    try {
      await blogService.like(blog);
      likeBlog(blog.id);
    } catch (e) {
      console.error(e.message);
      notify({
        message: "error while liking the blog",
        type: "error",
      });
    }
  };

  const handleDelete = async () => {
    try {
      if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        await blogService.deleteBlog(blog);
        delBlog(blog.id);
        navigate("/");
      }
      notify({
        message: `${blog.title} by ${blog.author} was deleted successfully`,
        type: "success",
      });
    } catch (e) {
      console.error(e.message);
      notify({
        message: "error while deleting the blog",
        type: "error",
      });
    }
  };

  const handleComment = async () => {
    try {
      const newComment = await blogService.addComment(blog, content);
      setContent("");
      setComments(comments.concat(newComment));
    } catch (e) {
      console.error(e.message);
      notify({
        message: "error while commenting",
        type: "error",
      });
    }
  };

  return (
    <Paper sx={{ p: { xs: 2.5, md: 4 } }}>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="overline" color="text.secondary">
            Blog details
          </Typography>
          <Typography variant="h2" component="h1">
            {blog.title}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            by {blog.author}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Chip label={`${blog.likes} likes`} color="primary" />
          <Chip label={`Added by ${blog.user.username}`} variant="outlined" />
        </Stack>

        <Typography>
          <a href={blog.url} target="_blank" rel="noreferrer">
            {blog.url}
          </a>
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Button variant="contained" onClick={handleLike}>
            like
          </Button>
          {user.username === blog.user.username ? (
            <Button variant="outlined" color="secondary" onClick={handleDelete}>
              remove
            </Button>
          ) : null}
        </Stack>

        <Divider />

        <Stack spacing={2}>
          <div>
            <Typography variant="h5" component="h2" sx={{ mb: 0.5 }}>
              comments
            </Typography>
            <Typography color="text.secondary">
              Leave a note or discussion point below.
            </Typography>
          </div>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            alignItems={{ xs: "stretch", sm: "flex-start" }}
          >
            <TextField
              fullWidth
              label="Comment"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={handleComment}
              sx={{ minWidth: 132 }}
            >
              comment
            </Button>
          </Stack>

          <Stack spacing={1.25}>
            {comments.length === 0 ? (
              <Typography color="text.secondary">No comments yet.</Typography>
            ) : (
              comments.map((comment) => (
                <Paper
                  key={comment.id}
                  sx={{ p: 1.5, bgcolor: "rgba(16, 42, 67, 0.02)" }}
                >
                  <Typography>{comment.content}</Typography>
                </Paper>
              ))
            )}
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Blog;
