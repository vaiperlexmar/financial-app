import { useNavigate } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";

export default function Header() {
  const navigate = useNavigate();

  const { appState, setAppState } = useAppContext();

  return (
    <header className="header">
      <div className="header__balance">
        <h3 className="header__balance-text heading_tertiary">
          Total balance:
        </h3>
        <h1 className="header__balance-value heading_primary">
          {appState.balance >= 0
            ? `$${appState.balance}`
            : `-$${appState.balance}`}
        </h1>
      </div>
      <div className="header__controls">
        <button className="header__button btn btn_small btn_rounded btn_gray">
          <img src="./src/assets/alarm.svg" alt="notifications" />
        </button>
        <button
          className="header__button btn btn_small btn_rounded btn_gray"
          onClick={() => {
            navigate("/settings");
          }}
        >
          <img src="./src/assets/more.svg" alt="settings" />
        </button>
      </div>
    </header>
  );
}
