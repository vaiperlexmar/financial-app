import { auth } from "../db";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { TextField, Button, Typography, Link } from "@mui/material";
import { useState, useEffect } from "react";
import Error from "./Error";

export default function Login() {
  const [isLogin, setIsLogin] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function switchLogin() {
    setIsLogin((mode) => !mode);
  }

  function handleEmailInput(e) {
    setEmail(e.target.value);
  }

  function handlePasswordInput(e) {
    setPassword(e.target.value);
  }

  function handleConfirmedPasswordInput(e) {
    setConfirmedPassword(e.target.value);
  }

  // TO-DO Возможность посмотреть пароль
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  function handleCreateNewUser() {
    if (password === confirmedPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setErrorMessage("Your passwords don't match. Please, check it again");
      setErrorVisible(true);
      // setTimeout(() => {
      //   setErrorVisible(false);
      // }, 1000);
    }
  }

  function handleSignIn() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="login__container">
      {isLogin ? (
        <>
          <Typography align="center" variant="h6" component="h2">
            Okay, you've been here before.
          </Typography>
          <Typography
            align="center"
            variant="h3"
            component="h2"
            marginBottom={"3rem"}
          >
            Log in, then.
          </Typography>
        </>
      ) : (
        <>
          <Typography align="center" variant="h6" component="h2">
            Is this your first time here? Then...
          </Typography>
          <Typography
            align="center"
            variant="h3"
            component="h2"
            marginBottom={"3rem"}
          >
            Create an account
          </Typography>
        </>
      )}

      <Error isVisible={errorVisible}>{errorMessage}</Error>

      <TextField
        className="login__input"
        label="Enter your email"
        variant="outlined"
        value={email}
        size="medium"
        fullWidth
        onChange={(e) => handleEmailInput(e)}
      />
      <TextField
        className="login__input"
        type={showPassword ? "text" : "password"}
        label="Enter your password"
        variant="outlined"
        value={password}
        size="medium"
        fullWidth
        onChange={(e) => handlePasswordInput(e)}
      />

      {!isLogin && (
        <TextField
          className="login__input"
          type={showPassword ? "text" : "password"}
          label="Confirm your password"
          variant="outlined"
          value={confirmedPassword}
          size="medium"
          fullWidth
          onChange={(e) => handleConfirmedPasswordInput(e)}
        />
      )}

      {/* TO-DO Менять функциональность кнопки в зависимости от логин не логин */}
      <Button
        variant="contained"
        sx={{
          marginBottom: "1rem",
        }}
        fullWidth
        onClick={() => handleCreateNewUser()}
        marginbottom={"1rem"}
        className="MuiButtonBase-root MuiButtonBase-root_pink"
      >
        Create
      </Button>

      <Typography
        align="center"
        variant="body1"
        component="p"
        className="paragraph"
      >
        {isLogin
          ? "You don't have an account yet?"
          : "Do you have an account already?"}{" "}
        <Link href="#" variant="body2" onClick={switchLogin}>
          {isLogin ? "Let's create a new one" : "Let's login"}
        </Link>
      </Typography>
    </div>
  );
}
