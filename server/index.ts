import * as jsonServer  from "json-server";

const server = jsonServer.create();
const path = require("path");
console.log('whyyyy');
console.log(__dirname);
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(8080, () => {
  console.log("JSON Server is running");
});