import express from "express";
import http from "http";
import {Server} from "socket.io";
import path from "path";
import {fileURLToPath} from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket)=>{
    console.log("New user connected : ", socket.id);


    // sabhi ko welcome message bhejo
    socket.broadcast.emit("chatMessage", "New user connected!");


    // user ka message sabhi ko bhejo
    socket.on("chatMessage", (msg)=>{
        io.emit("chatMessage", msg);
    });


    // user disconnect hone par

    socket.on("disconnect", ()=>{
        io.emit("chatMessage", "one user discconnect")
    });
});


const PORT = 3000;

server.listen(PORT,  ()=>{
    console.log("server is serving at : http://localhost:3000");
});