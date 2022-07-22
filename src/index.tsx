// eslint-disable-next-line import/no-extraneous-dependencies
import { createServer } from "miragejs";
import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./App";

createServer({
  routes() {
    this.namespace = "api";

    this.get("/transactions", () => {
      return [
        {
          id: 1,
          title: "Transaction",
          amount: 400,
          type: "deposit",
          category: "Food",
          createAt: new Date(),
        },
      ];
    });
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
