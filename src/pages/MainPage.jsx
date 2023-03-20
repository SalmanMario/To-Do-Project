import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export function MainPage() {
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
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
  return (
    <div>
      <h1>Add to do task</h1>
      <Button onClick={handleSignOut} variant="contained">
        Sign Out
      </Button>
    </div>
  );
}
