import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import React from "react";
import PostAddIcon from "@mui/icons-material/PostAdd";

const NewPost = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerOptions = {
    title: {
      maxLength: {
        value: 20,
        message: "too long",
      },
      minLength: {
        value: 2,
        message: "too short",
      },
      required: "Required field",
    },
    body: {
      maxLength: {
        value: 50,
        message: "too long",
      },
      minLength: {
        value: 10,
        message: "too short",
      },
      required: "Required field",
    },
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        endIcon={<PostAddIcon />}
        onClick={props.handleClickOpen}
      >
        new post
      </Button>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"New post"}</DialogTitle>
        <form onSubmit={handleSubmit(props.newPost)}>
          <DialogContent>
            <TextField
              id="outlined-basic"
              sx={{
                m: 1,
                minWidth: 300,
              }}
              label="title"
              helperText="enter the title of the post"
              variant="outlined"
              {...register("title", registerOptions.title)}
            />
            {errors?.title && (
              <Alert
                severity="error"
                style={{ backgroundColor: "rgb(255 255 255)" }}
              >
                {errors.title.message}
              </Alert>
            )}
            <TextField
              id="outlined-basic"
              sx={{
                m: 1,
                minWidth: 300,
              }}
              label="body"
              helperText="enter the body of the post"
              variant="outlined"
              {...register("body", registerOptions.body)}
            />
            {errors?.body && (
              <Alert
                severity="error"
                style={{ backgroundColor: "rgb(255 255 255)" }}
              >
                {errors.body.message}
              </Alert>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose}>cancle</Button>
            <Button type="submit" autoFocus>
              creat
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
};
export default NewPost;
