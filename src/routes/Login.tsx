import { auth, createUser } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { useNavigate } from "react-router-dom";
import { useState, ChangeEvent } from "react";
import { useAppContext } from "../hooks/useAppContext";

import { TextField, Button, Typography, Link } from "@mui/material";
import ErrorEl from "../components/ErrorEl";

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

  const { appState, setAppState } = useAppContext();

  function showError(message: string) {
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

  function handleUsernameInput(e: ChangeEvent<HTMLInputElement>) {
    setUsername((e.target as HTMLInputElement).value);
  }

  function handleEmailInput(e: ChangeEvent<HTMLInputElement>) {
    setEmail((e.target as HTMLInputElement).value);
  }

  function handlePasswordInput(e: ChangeEvent<HTMLInputElement>) {
    setPassword((e.target as HTMLInputElement).value);
  }

  function handleConfirmedPasswordInput(e: ChangeEvent<HTMLInputElement>) {
    setConfirmedPassword((e.target as HTMLInputElement).value);
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

        if (auth.currentUser !== null) {
          await updateProfile(auth.currentUser, {
            displayName: username,
          });
        }

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
          <Typography align="center" component="h2" variant="h6">
            Okay, you've been here before.
          </Typography>
          <Typography
            align="center"
            component="h2"
            marginBottom={"3rem"}
            variant="h3"
          >
            Log in, then.
          </Typography>
        </>
      ) : (
        <>
          <Typography align="center" component="h2" variant="h6">
            Is this your first time here? Then...
          </Typography>
          <Typography
            align="center"
            component="h2"
            marginBottom={"3rem"}
            variant="h3"
          >
            Create an account
          </Typography>
        </>
      )}

      <ErrorEl animationClass={errorAnimation} isVisible={errorVisible}>
        {errorMessage}
      </ErrorEl>

      {!isLogin && (
        <TextField
          fullWidth
          className="login__input"
          label="Enter your name"
          size="medium"
          value={username}
          variant="outlined"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleUsernameInput(e)
          }
        />
      )}

      <TextField
        fullWidth
        className="login__input"
        label="Enter your email"
        size="medium"
        value={email}
        variant="outlined"
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleEmailInput(e)}
      />
      <TextField
        fullWidth
        className="login__input"
        label="Enter your password"
        size="medium"
        type={showPassword ? "text" : "password"}
        value={password}
        variant="outlined"
        onChange={(e: ChangeEvent<HTMLInputElement>) => handlePasswordInput(e)}
      />

      {!isLogin && (
        <TextField
          fullWidth
          className="login__input"
          label="Confirm your password"
          size="medium"
          type={showPassword ? "text" : "password"}
          value={confirmedPassword}
          variant="outlined"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleConfirmedPasswordInput(e)
          }
        />
      )}

      <Button
        fullWidth
        className="MuiButtonBase-root MuiButtonBase-root_pink"
        sx={{
          marginBottom: "1rem",
        }}
        variant="contained"
        onClick={() => {
          isLogin ? handleSignIn() : handleCreateNewUser();
        }}
      >
        {isLogin ? "Login" : "Create"}
      </Button>

      <Typography
        align="center"
        className="paragraph"
        component="p"
        variant="body1"
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
