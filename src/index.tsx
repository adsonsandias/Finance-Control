// eslint-disable-next-line import/no-extraneous-dependencies
// import { createServer, Model } from "miragejs";
import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./App";

// createServer({
//   models: {
//     transactions: Model,
//   },

//   seeds(server) {
//     server.db.loadData({
//       transactions: [
//         {
//           id: 1,
//           title: "Google Developer App",
//           type: "deposit",
//           category: "Buiness",
//           amount: 13650,
//           createdAt: new Date("2022-03-15 15:20:00"),
//         },
//         {
//           id: 2,
//           title: "JAL Auto Peça S/A",
//           type: "withdraw",
//           category: "Carro",
//           amount: 650,
//           createdAt: new Date("2022-03-20 19:48:00"),
//         },
//         {
//           id: 3,
//           title: "Desenvolvimento de site",
//           type: "deposit",
//           category: "Desenvolvimento",
//           amount: 5850,
//           createdAt: new Date("2022-04-5 18:38:00"),
//         },
//         {
//           id: 4,
//           title: "Aluguel",
//           type: "withdraw",
//           category: "Casa",
//           amount: 1650,
//           createdAt: new Date("2022-04-10 19:15:00"),
//         },
//       ],
//     });
//   },

//   routes() {
//     this.namespace = "api";

//     this.get("/transactions", () => {
//       return this.schema.all("transactions");
//     });

//     this.post("/transactions", (schema, request) => {
//       const data = JSON.parse(request.requestBody);

//       return schema.create("transactions", data);
//     });
//   },
// });

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
