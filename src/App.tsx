import React from "react";

import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { Navbar } from "./components/Navbar";
import { GlobalStyle } from "./styles/global";

export function App() {
  return (
    <>
      <Header />
      <Dashboard />
      <Navbar />
      <GlobalStyle />
    </>
  );
}
