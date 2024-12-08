import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useAppContext } from "../hooks/useAppContext";

import { Typography, Button } from "@mui/material";

export default function Settings() {
  const { appState, setAppState } = useAppContext();

  function handleLogout() {
    signOut(auth).then(
      function () {
        console.log("Signed Out");
      },
      function (error) {
        console.error("Sign Out Error", error);
      }
    );
  }

  return (
    <div className="settings__container">
      <div className="settings__account account">
        <img
          className="account__icon"
          src={`${
            appState.user !== null
              ? appState.user.photoURL
              : "https://avatar.iran.liara.run/public"
          }`}
        />
        <Typography className="account__name" variant="h4">
          {appState.user !== null ? appState.user.displayName : ""}
        </Typography>
        <Typography className="account__email">
          {appState.user !== null ? appState.user.email : ""}
        </Typography>
      </div>
      <div className="settings">
        <Button
          fullWidth
          className="settings__btn btn_pink-outlined"
          variant="outlined"
          onClick={() => handleLogout()}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
