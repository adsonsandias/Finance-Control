/* eslint-disable react/jsx-no-bind */
import React from "react";

import { Header } from "../../components/Header";
import { Navbar } from "../../components/Navbar";
import { TransactionModal } from "../../components/TransactionModal";
import { UserProfile } from "../../components/UserProfile";

export function LoggedInUser() {
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
      <UserProfile />
      <TransactionModal
        isOpen={isTransactionModalOpen}
        onRequestClose={handleCloseIsNewTransactionModal}
      />
      <Navbar openTransactionModal={handleOpenIsNewTransactionModal} />
    </>
  );
}
