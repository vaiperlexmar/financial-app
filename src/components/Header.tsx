import { useNavigate } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";

import NotificationIcon from "../assets/alarm.svg";
import SettingsIcon from "../assets/more.svg";

export default function Header() {
  const navigate = useNavigate();

  const { appState } = useAppContext();

  return (
    <header className="header">
      <div className="header__balance">
        <h3 className="header__balance-text heading_tertiary">
          Total balance:
        </h3>
        <h1 className="header__balance-value heading_primary">
          {appState.balance >= 0
            ? `${appState.currency}${appState.balance}`
            : `-${appState.currency}${appState.balance}`}
        </h1>
      </div>
      <div className="header__controls">
        <button className="header__button btn btn_small btn_rounded btn_gray">
          <img src={NotificationIcon} alt="notifications" />
        </button>
        <button
          className="header__button btn btn_small btn_rounded btn_gray"
          onClick={() => {
            navigate("/settings");
          }}
        >
          <img src={SettingsIcon} alt="settings" />
        </button>
      </div>
    </header>
  );
}
