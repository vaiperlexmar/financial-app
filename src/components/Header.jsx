export default function Header({ balance }) {
  return (
    <header className="header">
      <div className="header__balance">
        <h3 className="header__balance-text heading_tertiary">
          Total balance:
        </h3>
        <h1 className="header__balance-value heading_primary">{balance >=  0 ? `$${balance}` : `-$${-balance}`}</h1>
      </div>
      <div className="header__controls">
        <button className="header__button btn btn_small btn_rounded btn_gray">
          <img src="./src/assets/alarm.svg" alt="notifications" />
        </button>
        <button className="header__button btn btn_small btn_rounded btn_gray">
          <img src="./src/assets/more.svg" alt="settings" />
        </button>
      </div>
    </header>
  );
}
