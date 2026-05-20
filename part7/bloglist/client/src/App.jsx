import { useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification";
import { useMatch, Link, Routes, Route } from "react-router-dom";
import Blog from "./components/Blog";
import CreateBlogForm from "./components/CreateBlogForm";
import { AppBar, Toolbar, Button } from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";
import { useBlogActions, useBlogs } from "./stores/blogStore";
import { useAuth, useAuthActions } from "./stores/authStore";
import Users from "./components/Users";
import User from "./components/User";

const App = () => {
  const { initialize } = useBlogActions();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <>
      <div>
        <NavBar />
        <ErrorBoundary FallbackComponent={Fallback}>
          <Notification />
          <Body />
        </ErrorBoundary>
      </div>
    </>
  );
};

const Body = () => {
  const blogs = useBlogs();
  const match = useMatch("/blogs/:id");
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;
  return (
    <Routes>
      <Route path="/" element={<Blogs />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/blogs/:id" element={<Blog blog={blog} />} />
      <Route path="/create" element={<CreateBlogForm />} />
      <Route path="/users" element={<Users />} />
      <Route path="/users/:username" element={<User />} />
      <Route path="*" element={<h1>404-Page not found</h1>} />
    </Routes>
  );
};

const NavBar = () => {
  const user = useAuth();
  const { logout } = useAuthActions();
  return (
    <AppBar position="static">
      <Toolbar>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <h1 style={{ display: "inline" }}>Blog App</h1>
          <div>
            <Button color="inherit">
              <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                Blogs
              </Link>
            </Button>

            {user && (
              <>
                <Button color="inherit">
                  <Link
                    to="/users"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Users
                  </Link>
                </Button>
                <Button color="inherit">
                  <Link
                    to="/create"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    New Blog
                  </Link>
                </Button>
                <Button style={{ color: "white" }} onClick={logout}>
                  Logout
                </Button>
              </>
            )}

            {!user && (
              <Button color="inherit">
                <Link
                  style={{ color: "white", textDecoration: "none" }}
                  to="/login"
                >
                  Login
                </Link>
              </Button>
            )}
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

const Fallback = () => {
  return <h1>Somthing went wrong :(</h1>;
};

export default App;
