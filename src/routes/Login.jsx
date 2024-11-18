import { auth, createUser } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AppContext } from "../AppProvider";

import { TextField, Button, Typography, Link } from "@mui/material";
import Error from "../components/Error";

export default function Login() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errorVisible, setErrorVisible] = useState(false);
  const [errorAnimation, setErrorAnimation] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { state: appState, dispatch: setAppState } = useContext(AppContext);

  function showError(message) {
    setErrorMessage(message);
    setErrorVisible(true);
    setErrorAnimation(true);
    setTimeout(() => {
      setErrorAnimation(false);
    }, 2500);
    setTimeout(() => {
      setErrorVisible(false);
    }, 3000);
  }

  function switchLogin() {
    setIsLogin((mode) => !mode);
  }

  function handleUsernameInput(e) {
    setUsername(e.target.value);
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
  // const handleClickShowPassword = () => setShowPassword((show) => !show);

  async function handleCreateNewUser() {
    if (password === confirmedPassword) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        await updateProfile(auth.currentUser, {
          displayName: username,
        });

        setAppState({ type: "auth", payload: user });
        createUser(user.uid, username, email);
        navigate("/dashboard");
        console.log(user);
      } catch (err) {
        console.error(err);
      }
    } else {
      showError("Your passwords don't match. Please, check it again");
    }
  }

  function handleSignIn() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setAppState({ type: "auth", payload: user });
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/dashboard");
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
        showError("User is not found");
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

      <Error isVisible={errorVisible} animationClass={errorAnimation}>
        {errorMessage}
      </Error>

      {!isLogin && (
        <TextField
          className="login__input"
          label="Enter your name"
          variant="outlined"
          value={username}
          size="medium"
          fullWidth
          onChange={(e) => handleUsernameInput(e)}
        />
      )}

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
        onClick={() => {
          isLogin ? handleSignIn() : handleCreateNewUser();
        }}
        marginbottom={"1rem"}
        className="MuiButtonBase-root MuiButtonBase-root_pink"
      >
        {isLogin ? "Login" : "Create"}
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
