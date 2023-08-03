import axios from "axios";

export const axiosClient = axios.create({
  // TODO: put into ENV file
  baseURL: "http://localhost:8000/api",
});
