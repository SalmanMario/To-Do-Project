import { Button, Checkbox, FormControlLabel, Link, Stack, TextField, Typography } from "@mui/material";
import { teal } from "@mui/material/colors";
import { Box, style } from "@mui/system";
import { auth } from "../firebase.js";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "../pages/register.css";

export function Register() {
  // Disable/Enable button pentru checkbox true sau false
  const [agree, setAgree] = useState(false);
  // State pentru eroare input invalid email
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  // State pentru eroare text invalid email
  const [helperTextEmail, setHelperTextEmail] = useState("");
  const [helperTextPassword, setHelperTextPassword] = useState("");
  // checkBox care activeaza button-ul
  const checkBoxHandler = () => {
    setAgree(!agree);
  };
  // State cu un obiect gol care o sa ia atributele din input
  const [registerInformation, setRegisterInformation] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  // Label pentru checkbox
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  // Navigate ca sa ma pot intoarce pe ce pagina vreau
  const navigate = useNavigate();
  const handleRegistration = async () => {
    // Validare email regex
    const emailRegex = /^[a-z0-9_.+%#-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
    if (
      emailRegex.test(registerInformation.email) &&
      emailRegex.test(registerInformation.confirmEmail) &&
      registerInformation.email === registerInformation.confirmEmail &&
      registerInformation.password === registerInformation.confirmPassword
    ) {
      try {
        await createUserWithEmailAndPassword(auth, registerInformation.email, registerInformation.password);
        navigate("/");
      } catch (err) {
        alert(err.message);
      }
    }

    if (
      registerInformation.email !== registerInformation.confirmEmail ||
      registerInformation.email === "" ||
      registerInformation.confirmEmail === ""
    ) {
      setErrorEmail(true);
      setHelperTextEmail("Your email is invalid or does not match");
    } else {
      setErrorEmail(false);
      setHelperTextEmail("Your email is correct");
    }
    if (
      registerInformation.password !== registerInformation.confirmPassword ||
      registerInformation.password === "" ||
      registerInformation.confirmPassword
    ) {
      setErrorPassword(true);
      setHelperTextPassword("Your password is invalid or does not match");
    } else {
      setErrorPassword(false);
      setHelperTextPassword("Your password is correct");
    }
  };

  // Redirectioneaza catre pagina de login
  const returnLoginPage = () => {
    navigate("/");
  };

  return (
    <div className="register-color">
      <Stack
        bgcolor="#80cbc4"
        sx={{ "& .MuiTextField-root": { m: 2, width: "auto", minWidth: 300 } }}
        justifyContent="center"
        alignItems="center"
      >
        <img className="register-image" src="../src/img/lake.jpg" />
        <Typography color="#fafafa" textAlign="center" variant="h2">
          Register
        </Typography>
        <TextField
          InputLabelProps={{ style: { color: "#fafafa", fontFamily: "Inter", fontWeight: 700, fontSize: 18 } }}
          variant="filled"
          sx={{ input: { color: "white", bgcolor: teal[500], fontFamily: "Montserrat", fontWeight: 500 } }}
          onChange={(e) => setRegisterInformation({ ...registerInformation, email: e.target.value })}
          value={registerInformation.email}
          type="email"
          required
          error={errorEmail}
          helperText={helperTextEmail}
          id="email"
          label="Email"
        />
        <TextField
          InputLabelProps={{ style: { color: "#fafafa", fontFamily: "Inter", fontWeight: 700, fontSize: 18 } }}
          variant="filled"
          sx={{ input: { color: "white", bgcolor: teal[500], fontFamily: "Montserrat", fontWeight: 500 } }}
          onChange={(e) => setRegisterInformation({ ...registerInformation, confirmEmail: e.target.value })}
          value={registerInformation.confirmEmail}
          type="email"
          error={errorEmail}
          helperText={helperTextEmail}
          required
          id="confirmEmail"
          label="Confirm Email"
        />
        <TextField
          InputLabelProps={{ style: { color: "#fafafa", fontFamily: "Inter", fontWeight: 700, fontSize: 18 } }}
          variant="filled"
          sx={{ input: { color: "white", bgcolor: teal[500], fontFamily: "Montserrat", fontWeight: 500 } }}
          onChange={(e) => setRegisterInformation({ ...registerInformation, password: e.target.value })}
          value={registerInformation.password}
          type="password"
          required
          error={errorPassword}
          helperText={helperTextPassword}
          id="password"
          label="Password"
        />
        <TextField
          InputLabelProps={{ style: { color: "#fafafa", fontFamily: "Inter", fontWeight: 700, fontSize: 18 } }}
          variant="filled"
          sx={{ input: { color: "white", bgcolor: teal[500], fontFamily: "Montserrat", fontWeight: 500 } }}
          onChange={(e) => setRegisterInformation({ ...registerInformation, confirmPassword: e.target.value })}
          value={registerInformation.confirmPassword}
          type="password"
          required
          error={errorPassword}
          helperText={helperTextPassword}
          id="confirmPassword"
          label="Confirm Password"
        />
        <Link href="/terms" target="_blank">
          <Checkbox sx={{ "&.Mui-checked": { color: teal[500] } }} onClick={checkBoxHandler} />
          <span className="link-terms">I agree with terms & conditions</span>
        </Link>
        <Box>
          <Button
            sx={{ mx: 2, width: 125, bgcolor: teal[800], "&:hover": { bgcolor: teal[400] } }}
            disabled={!agree}
            onClick={handleRegistration}
            variant="contained"
          >
            Submit
          </Button>
          <Button
            sx={{ mx: 2, width: 125, bgcolor: teal[800], "&:hover": { bgcolor: teal[400] } }}
            onClick={returnLoginPage}
            variant="contained"
          >
            Go Back
          </Button>
        </Box>
      </Stack>
    </div>
  );
}
