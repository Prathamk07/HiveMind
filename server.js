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

//socketio
function addUser(userName, id) {
    if (!userList.has(userName)) {
        userList.set(userName, new Set(id));
        console.log(userList)
    } else {
        userList.get(userName).add(id);
    }
}

function removeUser(userName, id) {
    if (userList.has(userName)) {
        let userIds = userList.get(userName);
        if (userIds.size == 0) {
            userList.delete(userName);
        }
    }
}


app.get('/', (req, res) => {
    res.send('Heello world');
})

let userList = new Map();

io.on('connection', (socket) => {

    let userName = socket.handshake.query.userName;
    console.log('user connected : ',userName)
    addUser(userName, socket.id);

    socket.broadcast.emit('user-list', [...userList.keys()]);
    socket.emit('user-list', [...userList.keys()]);

    socket.on('message', (msg) => {
        socket.broadcast.emit('message-broadcast', {message: msg, userName: userName});
        console.log(msg)
    })

    socket.on('disconnect', (reason) => {
        removeUser(userName, socket.id);
    })
});


//rest
const port = ( "3000");
app.set("port", port);




server.listen(port,()=>{
    console.log('Server running at port : ',port)

});


