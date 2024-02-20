import axios from "axios"

const server = axios.create({
  // baseURL: 'http://localhost:9090/',
  // baseURL: 'http://172.29.11.44:82/',
  baseURL: '../',
  // timeout: 50000,
  timeout: 1000 * 10,
});

export default server;
