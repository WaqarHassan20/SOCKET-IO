import express from "express"
import {createServer} from "http"
import {Server} from "socket.io"

const PORT = 3000

const app = express()
const HttpServer = createServer(app);
const io = new Server(HttpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection",(socket)=>{
  // console.log("What is socket", socket);
  console.log("Socket is active to be connected");
  
  socket.on("chat", (payload) => {
    console.log("What is payload", payload);
    io.emit("chat", payload);
  });
})

HttpServer.listen(PORT,()=>{
    console.log(`Server is running on the port ${PORT} ...`);
})