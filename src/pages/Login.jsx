import { Box, Button, TextField, Typography } from "@mui/material";
import { auth } from "../firebase.js";
import React, { useEffect, useState } from "react";
import { teal } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Stack } from "@mui/system";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorTextPassword, setErrorTextPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorTextEmail, setErrorTextEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const login = async () => {
    if (password === "") {
      setErrorPassword(true);
      setErrorTextPassword("Password invalid");
    }
    if (email === "") {
      setErrorEmail(true);
      setErrorTextEmail("Email invalid");
    }
    await signInWithEmailAndPassword(auth, email, password);
    try {
      navigate("/mainpage");
    } catch (err) {
      alert(err.message);
    }
  };

  const navigate = useNavigate();
  const handleNewAccount = () => {
    navigate("/register");
  };
  return (
    <div className="register-color">
      <Stack
        bgcolor="#80cbc4"
        sx={{ "& .MuiTextField-root": { m: 2, width: "auto", minWidth: 300 } }}
        justifyContent="center"
        alignItems="center"
      >
        <img className="register-image" src="../src/images/lake.jpg" />
        <Typography textAlign="center" sx={{ color: "#fafafa" }} variant="h2">
          My To-Do Project
        </Typography>
        <TextField
          InputLabelProps={{ style: { color: "#fafafa", fontFamily: "Inter", fontWeight: 700, fontSize: 18 } }}
          variant="filled"
          sx={{ input: { color: "white", bgcolor: teal[500], fontFamily: "Montserrat", fontWeight: 500 } }}
          onChange={handleEmailChange}
          value={email}
          error={errorEmail}
          helperText={errorTextEmail}
          required
          id="email"
          type="email"
          label="email"
        />
        <TextField
          InputLabelProps={{ style: { color: "#fafafa", fontFamily: "Inter", fontWeight: 700, fontSize: 18 } }}
          variant="filled"
          sx={{ input: { color: "white", bgcolor: teal[500], fontFamily: "Montserrat", fontWeight: 500 } }}
          onChange={handleChangePassword}
          value={password}
          error={errorPassword}
          helperText={errorTextPassword}
          required
          id="password"
          type="password"
          label="password"
        />
        <Box>
          <Button
            onClick={login}
            variant="contained"
            sx={{ mx: 2, width: 125, bgcolor: teal[800], "&:hover": { bgcolor: teal[400] } }}
          >
            Login
          </Button>
          <Button
            onClick={handleNewAccount}
            variant="contained"
            sx={{ mx: 2, width: 125, bgcolor: teal[800], "&:hover": { bgcolor: teal[400] } }}
          >
            Create new Account
          </Button>
        </Box>
      </Stack>
    </div>
  );
}
