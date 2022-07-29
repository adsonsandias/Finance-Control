import axios from "axios";

export const api = axios.create({
  baseURL: "https://finance-control-steel.vercel.app/api",
});
