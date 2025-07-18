/* eslint-disable react/jsx-no-bind */
import React from "react";
import { Route, Routes } from "react-router";

import { Header } from "../../components/Header";
import { Navbar } from "../../components/Navbar";
import { TransactionModal } from "../../components/TransactionModal";
import { HelpDetails } from "../../components/User/Config/HelpDetails";
import { LoginDetails } from "../../components/User/Config/LoginDetail";
import { VersionDetails } from "../../components/User/Config/VersionDetails";
import { UserProfile } from "../../components/User/UserProfile";
import { PageNotFound } from "../PageNotFound";

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

      <Routes>
        <Route path="/" element={<UserProfile />} />
        <Route path="login-details" element={<LoginDetails />} />
        <Route path="help-details" element={<HelpDetails />} />
        <Route path="version-detail" element={<VersionDetails />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <TransactionModal
        isOpen={isTransactionModalOpen}
        onRequestClose={handleCloseIsNewTransactionModal}
      />

      <Navbar openTransactionModal={handleOpenIsNewTransactionModal} />
    </>
  );
}
