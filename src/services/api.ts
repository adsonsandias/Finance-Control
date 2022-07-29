import axios from "axios";

export const api = axios.create({
  baseURL: "finance-control-steel.vercel.app/api",
});
