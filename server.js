const app = require("./backend/app");
const debug = require("debug")("node-angular");
const http = require("http");
const dotenv=require('dotenv')
// app.use(dotenv)


const port = ( "3000");
app.set("port", port);


const server = http.createServer(app);
// server.on("error", onError);
// server.on("listening", onListening);
console.log('Server running at port : ',port)
server.listen(port);
