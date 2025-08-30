import React, { useEffect, useMemo, useState } from "react"
import {io} from "socket.io-client"
import { Button, Container, Stack, TextField, Typography } from "@mui/material"

function App() {

  const [socketId, setSocketId] = useState("")
  const [roomName, setRoomName] = useState("")
  const [message, setMessage] = useState("")
  const [incomingMsg, setIncomingMsg] = useState<string[]>([])
  const [room, setRoom] = useState("")
  const socket = useMemo(() => io("http://localhost:3000"), []) 

  console.log(incomingMsg);

  useEffect(()=>{
    socket.on("connect", () => { 
      console.log("New User Connected");
      setSocketId(socket.id ?? "")
      console.log("React User Id : ", socket.id);
    })

    socket.on("message",(message)=>{
      console.log(message, socket.id);
    })

    socket.on("receive-message",(messageFromServer)=>{
      setIncomingMsg((msg) => [...msg, messageFromServer])
      console.log(messageFromServer);
    })

    return () => {
      socket.off("message")
      socket.off("receive-message")
      socket.disconnect()
    }

  },[])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    socket.emit("message", {message,room})
    setMessage("")
  }

  const handleJoinRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    socket.emit("join-room", roomName)
    setRoomName("")
  }


  return (
    <>
    <Container maxWidth="sm">
        <Typography variant="h4" component="div" gutterBottom>
          Welcome to Socket-io RTC Library
      </Typography>
    
        <Typography variant="h5" component="div" gutterBottom>
          {socketId}
      </Typography>
    


        <form onSubmit={handleJoinRoom}>

          <h5>Join Room</h5>
          <br />
          <TextField value={roomName} onChange={e => setRoomName(e.target.value)} id="outlined-basic" variant="outlined" label="Room Name"></TextField>

          <Button variant="contained" color="primary" type="submit">Join Room</Button>
          
    </form>

    <form onSubmit={handleSubmit}>

          <TextField value={message} onChange={e => setMessage(e.target.value)} id="outlined-basic" variant="outlined" label="Message"></TextField>
          <br />
          <TextField value={room} onChange={e => setRoom(e.target.value)} id="outlined-basic" variant="outlined" label="Room"></TextField>

          <Button variant="contained" color="primary" type="submit">Send</Button>
          
    </form>

        <Stack>
          {incomingMsg.map((msg, idx) => (
            <Typography variant="h6" component="div" gutterBottom key={idx}>{msg}</Typography>
          ))}
        </Stack>

    </Container>
    </>
  )
}

export default App