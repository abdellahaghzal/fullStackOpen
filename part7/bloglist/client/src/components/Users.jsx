import { useBlogs } from "../stores/blogStore";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { Link } from "react-router-dom";

const Users = () => {
  const blogs = useBlogs();
  const userInfo = blogs.reduce((acc, cur) => {
    acc[cur.user.username] = (acc[cur.user.username] || 0) + 1;
    return acc;
  }, {});
  return (
    <>
      <h1>Users</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Blogs created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(userInfo)
            .sort((a, b) => b[1] - a[1])
            .map(([username, blogCount]) => (
              <TableRow key={username}>
                <TableCell>
                  <Link to={`/users/${username}`}>{username}</Link>
                </TableCell>
                <TableCell>{blogCount}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Users;
