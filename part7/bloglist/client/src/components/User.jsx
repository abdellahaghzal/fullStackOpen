import { useParams } from "react-router-dom";
import { useBlogs } from "../stores/blogStore";

const User = () => {
  const username = useParams().username;
  const blogs = useBlogs();
  const userBlogs = blogs.filter((blog) => blog.user.username === username);
  return (
    <>
      <h1>{username}</h1>
      <h3>added blogs</h3>
      <ul>
        {userBlogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  );
};

export default User;
