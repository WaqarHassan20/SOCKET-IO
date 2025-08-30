import { createServer } from "http";
import {Server} from "socket.io"
import express from "express"

const PORT = 3000

const app = express()
const HttpServer = createServer(app);
const io = new Server(HttpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.get("/",(req,res)=>{
  res.json({ message: "Hello World" });
})

io.on("connection", (socket) => {
  console.log("User Connected Successfully");
  console.log("User id :", socket.id);
  socket.broadcast.emit("message", "Welcome to the Server");
});

HttpServer.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});