/* eslint-disable react/jsx-no-bind */
import React from "react";
import Modal from "react-modal";

import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { Navbar } from "./components/Navbar";
import { TransactionModal } from "./components/TransactionModal";
import { GlobalStyle } from "./styles/global";

Modal.setAppElement("#root");

export function App() {
  const [isTransactionModalOpen, setIsTransactionModalOpen] =
    React.useState(false);

  function handleOpenIsNewTransactionModal() {
    setIsTransactionModalOpen(true);
  }

  function handleCloseIsNewTransactionModal() {
    setIsTransactionModalOpen(false);
  }
  return (
    <>
      <Header />
      <Dashboard />
      <TransactionModal
        isOpen={isTransactionModalOpen}
        onRequestClose={handleCloseIsNewTransactionModal}
      />
      <Navbar openTransactionModal={handleOpenIsNewTransactionModal} />
      <GlobalStyle />
    </>
  );
}
