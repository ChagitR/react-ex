import React from "react";
import Box from "@mui/material/Box";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const PostsTable = (props) => {
  return (
    <Box
      sx={{
        width:
          props.anchor === "top" || props.anchor === "bottom" ? "auto" : 500,
      }}
      role="presentation"
      onClick={props.toggleDrawer(props.anchor, false)}
      onKeyDown={props.toggleDrawer(props.anchor, false)}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Post ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Body</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.singlePost.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.id}</TableCell>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.body}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};
export default PostsTable;
