import { useState, useContext } from "react";
import { AppContext } from "../AppProvider";

import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import DynamicModal from "../components/Modal/DynamicModal";

export default function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [debtAmount, setDebtAmount] = useState(0);
  const [savingsAmount, setSavingsAmount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("income");

  const navigate = useNavigate();

  const { state: appState, dispatch: setAppState } = useContext(AppContext);
  // TODO сейчас делаю модалку, нужно сверстать её для разных модов (newCard)

  function handleModalOpen() {
    setIsModalOpen(true);
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  function addIncome(value) {
    setAppState({ type: "addIncome", payload: value });
  }

  function addExpense(value) {
    setAppState({ type: "decrementBalance", payload: Number(value) });
  }

  return (
    <>
      <DynamicModal
        mode={modalMode}
        open={isModalOpen}
        onClose={handleModalClose}
        balance={appState.balance}
        setBalance={setBalance}
        addIncome={addIncome}
        addExpense={addExpense}
      />
      <Header balance={appState.balance} />
      <main className="main">
        <h2 className="heading_secondary heading_secondary--with-margin">
          My cards
        </h2>
        <section className="card__list">
          <div
            className="new-card-btn btn"
            onClick={() => incrementBalance({ type: "incrementBalance" })}
          >
            <img
              className="btn__icon_medium"
              src="./src/assets/plus.svg"
              alt="plus"
            />
          </div>

          <div className="card card_black">
            <img className="card__icon" src="./src/assets/visa.svg" alt="" />
            <p className="card__number">**** 9841</p>
            <p className="card__balance">$17,452</p>
          </div>

          <div className="card card_white">
            <img className="card__icon" src="./src/assets/visa.svg" alt="" />
            <p className="card__number">**** 9841</p>
            <p className="card__balance">$17,452</p>
          </div>
        </section>

        <section className="budget">
          <button
            className="budget__btn btn budget__income"
            onClick={() => {
              setModalMode("income");
              handleModalOpen();
            }}
          >
            Add income{" "}
            <img
              className="btn__icon_medium"
              src="./src/assets/income.svg"
              alt=""
            />
          </button>

          <button
            className="budget__btn btn budget__expenses"
            onClick={() => {
              setModalMode("expense");
              handleModalOpen();
            }}
          >
            Add expense <img src="./src/assets/expense.svg" alt="" />
          </button>
        </section>

        <section className="financial-overview">
          <div className="financial-overview__card financial-overview__debts">
            <p className="financial-overview__value">${debtAmount}</p>
            <p className="financial-overview__text">Debts</p>
          </div>

          <div className="financial-overview__card financial-overview__savings">
            <p className="financial-overview__savings__value">
              ${savingsAmount}
            </p>
            <p className="financial-overview__savings__text">Savings</p>
          </div>
        </section>

        <section className="statistics">
          <p className="statistics__text">Control your finances</p>
          <button
            className="statistics__btn btn btn_rounded btn_black"
            onClick={() => navigate("/statistics")}
          >
            Statistics
          </button>
        </section>

        <section className="expenses">
          <header className="header">
            <h2 className="heading_secondary">Expenses</h2>
            <button
              className="header__button btn btn_small btn_rounded btn_gray"
              onClick={() => {
                setModalMode("expense");
                handleModalOpen();
              }}
            >
              <img
                className="btn__icon_small"
                src="./src/assets/plus.svg"
                alt="add-new-expense"
              />
            </button>
          </header>

          <ul className="expenses__item-list">
            <li className="expenses__item">
              <div className="expenses__item-icon-wrapper">
                <img
                  className="expenses__item-icon"
                  src="./src/assets/coctail.svg"
                  alt=""
                />
              </div>
              <p className="expenses__item-value">$250</p>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}
