import { create } from "apisauce";

const api = create({
  baseURL: "http://192.168.0.3:3333",
  timeout: 10000,
});

export default api;
