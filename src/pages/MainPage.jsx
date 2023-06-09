import { Button, TextField, Typography } from "@mui/material";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import { Box } from "@mui/system";
import { blue, red, green, orange } from "@mui/material/colors";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import { Todo } from "../components/Todo";

export function MainPage() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUidd, setTempUidd] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setTodos([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((todo) => {
              setTodos((oldArray) => [...oldArray, todo]);
            });
          }
        });
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    try {
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  const writeToDatabase = () => {
    const uidd = uid();
    set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
      name: todo,
      uidd: uidd,
    });

    setTodo("");
  };
  return (
    <div className="mainpage-color">
      <Box
        sx={{ bgcolor: "#187fa5", color: "#fafafa" }}
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
      >
        <Typography sx={{ mb: 2, px: 2 }} variant="h3">
          My To-Do-Project
        </Typography>
        <Box textAlign="center" display="flex" justifyContent="center" alignItems="center">
          <TextField
            InputLabelProps={{ style: { color: "#fafafa", fontFamily: "Inter", fontWeight: 700, fontSize: 18 } }}
            sx={{ input: { color: "white", bgcolor: blue[500], fontFamily: "Montserrat", fontWeight: 500 } }}
            placeholder="Add todo..."
            type="text"
            variant="filled"
            value={todo}
            label="Add To-Do"
            onChange={(e) => setTodo(e.target.value)}
          />
          <Button
            sx={{ mx: 2, bgcolor: green[500], "&:hover": { bgcolor: green[600] } }}
            onClick={writeToDatabase}
            variant="contained"
            endIcon={<AddIcon />}
          >
            Add
          </Button>
        </Box>
        <Box>
          {todos.map((todo, index) => (
            <Todo key={index} todo={todo} />
          ))}
          <Button
            sx={{ mt: 10, bgcolor: blue[700], "&:hover": { bgcolor: blue[900] } }}
            onClick={handleSignOut}
            variant="contained"
            endIcon={<LogoutIcon />}
          >
            Sign Out
          </Button>
        </Box>
      </Box>
    </div>
  );
}
