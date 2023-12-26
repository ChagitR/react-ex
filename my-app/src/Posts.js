import React, { useEffect, useReducer, useState } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { fetchPosts } from "./Service";
import { NewPostSrv } from "./Service";
import NewPost from "./NewPost";
import PostsTable from "./PostsTable";

const Posts = (props) => {
  const [posts, setPosts] = useState([]);
  const [singlePost, setSinglePost] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const userId = props.userId;
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    right: false,
  });

  //Opening the window of adding a post
  const handleClickOpen = () => {
    setOpen(true);
  };

  //Closing the add post window
  const handleClose = () => {
    setOpen(false);
  };

  //Opening the list of posts on the right side of the screen
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown") {
      return;
    }
    setSinglePost(posts.filter((p) => p.userId === userId));
    setState({ ...state, [anchor]: open });
  };

  //Loading the posts
  const getPosts = async () => {
    try {
      const data = await fetchPosts();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  //Add post function
  const newPost = (data) => {
    data.userId = userId;
    NewPostSrv(data).then((p) => addToPostsList(p));
    handleClose();
  };

  //Adding the newly created post to the list of posts
  const addToPostsList = (data) => {
    singlePost.push(data);
    setSinglePost(singlePost);
    posts.push(data);
    setPosts(posts);
    if (isChange) setIsChange(false);
    else setIsChange(true);
  };

  useEffect(() => {
    getPosts();
  }, []);

 //If a new post is added then reload all the posts
  useReducer(() => {
    setSinglePost(posts.filter((p) => p.userId === userId));
  }, [isChange]);

  const list = (anchor) => (
    <>
      {/* render the add post component */}
      <NewPost
        open={open}
        handleClose={handleClose}
        handleClickOpen={handleClickOpen}
        singlePost={singlePost}
        newPost={newPost}
      ></NewPost>

      {/* render the post list component */}{" "}
      <PostsTable
        toggleDrawer={toggleDrawer}
        singlePost={singlePost}
        anchor={anchor}
      ></PostsTable>
    </>
  );

  return (
    <div>
      <React.Fragment key={"right"}>
        <Button onClick={toggleDrawer("right", true)}>posts</Button>
        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          {list("right")}
        </Drawer>
      </React.Fragment>
    </div>
  );
};
export default Posts;
