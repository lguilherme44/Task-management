import { create } from "apisauce";

const api = create({
  baseURL: "http://192.168.1.10:3333",
  timeout: 20000,
});

export default api;
