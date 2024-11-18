import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { AppContext } from "../AppProvider";
import { useContext } from "react";

import { Typography, Button } from "@mui/material";

export default function Settings() {
  const { state: appState, dispatch: setAppState } = useContext(AppContext);

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
            appState.user.photoURL || "https://avatar.iran.liara.run/public"
          }`}
        />
        <Typography className="account__name" variant="h4">
          {appState.user.displayName}
        </Typography>
        <Typography className="account__email">
          {appState.user.email}
        </Typography>
      </div>
      <div className="settings">
        <Button
          className="settings__btn btn_pink-outlined"
          variant="outlined"
          fullWidth
          onClick={() => handleLogout()}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
