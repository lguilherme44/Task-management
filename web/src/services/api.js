import { create } from "apisauce";

const api = create({
  baseURL: "http://192.168.1.10:4444",
  timeout: 20000,
});

export default api;
