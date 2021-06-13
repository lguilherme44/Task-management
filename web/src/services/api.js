import { create } from "apisauce";

const api = create({
  baseURL: "http://localhost:3333",
  timeout: 30000,
});

export default api;
