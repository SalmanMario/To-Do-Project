import { Box, Button, TextField, Typography } from "@mui/material";
import { blue, green, orange, red } from "@mui/material/colors";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import FeedIcon from "@mui/icons-material/Feed";
import { auth, db } from "../firebase";
import { ref, remove, update } from "firebase/database";

export function Todo({ todo }) {
  const [isEdit, setIsEdit] = useState(false);
  const [todoText, setTodoText] = useState(todo.name);

  const handleUpdate = () => {
    setIsEdit(true);
  };

  const handleTodo = (e) => {
    setTodoText(e.target.value);
  };

  const handleEditConfirm = () => {
    update(ref(db, `/${auth.currentUser.uid}/${todo.uidd}`), {
      name: todoText,
      tempUidd: todo.uidd,
    });

    setIsEdit(false);
  };

  const handleDelete = () => {
    remove(ref(db, `/${auth.currentUser.uid}/${todo.uidd}`));
  };

  const handleDiscard = () => {
    setTodoText(todo.name);
    setIsEdit(false);
  };

  console.log(todo);
  return (
    <Box sx={{ m: 8 }}>
      {isEdit ? (
        <TextField
          InputLabelProps={{ style: { color: "#fafafa", fontFamily: "Inter", fontWeight: 700, fontSize: 18 } }}
          sx={{ input: { color: "white", bgcolor: blue[500], fontFamily: "Montserrat", fontWeight: 500 } }}
          placeholder="Update"
          type="text"
          variant="filled"
          value={todoText}
          onChange={handleTodo}
          label="Update"
        ></TextField>
      ) : (
        <Typography sx={{ m: 2, bgcolor: blue[500], borderRadius: 5, px: 3 }} textAlign="center" variant="h4">
          {todo.name}
        </Typography>
      )}

      {!isEdit ? (
        <Button
          sx={{ m: 1, bgcolor: green[500], "&:hover": { bgcolor: green[600] } }}
          variant="contained"
          endIcon={<EditIcon />}
          onClick={handleUpdate}
        >
          Update
        </Button>
      ) : (
        <>
          <Button
            sx={{ m: 1, bgcolor: green[500], "&:hover": { bgcolor: green[600] } }}
            variant="contained"
            endIcon={<CheckIcon />}
            onClick={handleEditConfirm}
          >
            Confirm
          </Button>
          <Button
            sx={{ m: 1, bgcolor: orange[600], "&:hover": { bgcolor: orange[700] } }}
            variant="contained"
            endIcon={<FeedIcon />}
            onClick={handleDiscard}
          >
            Discard
          </Button>
        </>
      )}
      <Button
        sx={{ m: 1, bgcolor: red[800], "&:hover": { bgcolor: red[700] } }}
        variant="contained"
        endIcon={<DeleteIcon />}
        onClick={() => handleDelete()}
      >
        Delete
      </Button>
    </Box>
  );
}
