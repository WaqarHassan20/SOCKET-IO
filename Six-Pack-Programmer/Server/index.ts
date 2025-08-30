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
  
  // socket.emit("message", "Welcome to the Server");
  
  // socket.broadcast.emit("message", "Welcome to the Server");

  socket.on("message",({message,room})=>{
    console.log("message is : ", message, "Room is : ", room);

    // // To send to all of the connected users except the sender
    // socket.broadcast.emit("receive-message", message);
    
    // To send to all of the connected users
    io.to(room).emit("receive-message", message);
  })


  socket.on("join-room", (roomName) => {
    socket.join(roomName);
    console.log("User joined the room : ", roomName);
  });

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
    });
});

HttpServer.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});