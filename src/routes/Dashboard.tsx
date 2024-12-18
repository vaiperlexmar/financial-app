import { useState } from "react";
import { useAppContext } from "../hooks/useAppContext";

import { ActionType, Card, BasicTransaction } from "../types";

import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import DynamicModal from "../components/Modal/DynamicModal";
import FinancialCard from "../components/FinancialCard";

import { ModalModes } from "../types";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<ModalModes>(ModalModes.INCOME);

  const navigate = useNavigate();

  const { appState, setAppState } = useAppContext();

  function handleModalOpen() {
    setIsModalOpen(true);
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  function addIncome(value: BasicTransaction) {
    setAppState({ type: ActionType.ADDINCOME, payload: value });
  }

  function addExpense(value: BasicTransaction) {
    setAppState({ type: ActionType.ADDEXPENSE, payload: value });
  }

  function addNewCard(value: Card) {
    setAppState({ type: ActionType.ADDCARD, payload: value });
  }

  return (
    <>
      <DynamicModal
        addCard={addNewCard}
        addExpense={addExpense}
        addIncome={addIncome}
        mode={modalMode}
        open={isModalOpen}
        onClose={handleModalClose}
      />
      <Header />
      <main className="main">
        <h2 className="heading_secondary heading_secondary--with-margin">
          My cards
        </h2>
        <section className="cards">
          <div
            className="new-card-btn btn"
            onClick={() => {
              setModalMode(ModalModes.CARD);
              handleModalOpen();
            }}
          >
            <img
              alt="plus"
              className="btn__icon_medium"
              src="./src/assets/plus.svg"
            />
          </div>

          <ul className="card__list">
            {appState.cards.map((item) => {
              return <FinancialCard key={item.id} {...item} />;
            })}
          </ul>
        </section>

        <section className="budget">
          <div className="budget__btn-container">
            <button
              className="btn btn_transparent budget__btn budget__income"
              onClick={() => {
                setModalMode(ModalModes.INCOME);
                handleModalOpen();
              }}
            >
              Add income{" "}
              <div className="btn__icon-container_rounded">
                <img
                  alt=""
                  className="btn__icon_medium"
                  src="./src/assets/income.svg"
                />
              </div>
            </button>
          </div>

          <div className="budget__btn-container">
            <button
              className="btn btn_transparent budget__btn budget__expenses"
              onClick={() => {
                setModalMode(ModalModes.EXPENSE);
                handleModalOpen();
              }}
            >
              Add expense{" "}
              <div className="btn__icon-container_rounded">
                <img
                  alt=""
                  className="btn__icon_medium "
                  src="./src/assets/expense.svg"
                />
              </div>
            </button>
          </div>
        </section>

        <section className="financial-overview">
          <div className="financial-overview__card financial-overview__debts">
            <p className="financial-overview__value">${appState.debtsAmount}</p>
            <p className="financial-overview__text">Debts</p>
          </div>

          <div className="financial-overview__card financial-overview__savings">
            <p className="financial-overview__savings__value">
              ${appState.savingsAmount}
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
                setModalMode(ModalModes.EXPENSE);
                handleModalOpen();
              }}
            >
              <img
                alt="add-new-expense"
                className="btn__icon_small"
                src="./src/assets/plus.svg"
              />
            </button>
          </header>

          <ul className="expenses__item-list">
            <li className="expenses__item">
              <div className="expenses__item-icon-wrapper">
                <img
                  alt=""
                  className="expenses__item-icon"
                  src="./src/assets/coctail.svg"
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
