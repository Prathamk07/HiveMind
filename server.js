const app = require("./backend/app");
const debug = require("debug")("node-angular");
const http = require("http");
const dotenv=require('dotenv')
// const {Server}=require('socket.io')
// app.use(dotenv)
// const socketIO =require('socket.io')
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
});
io.on('connection',(socket)=>{
    console.log('Socket Connected')
})
const port = ( "3000");
app.set("port", port);




server.listen(port,()=>{
    console.log('Server running at port : ',port)

});


