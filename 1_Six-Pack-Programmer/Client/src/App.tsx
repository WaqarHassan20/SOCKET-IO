import { useEffect } from "react"
import {io} from "socket.io-client"

function App() {

  const socket = io("http://localhost:3000") 

  useEffect(()=>{
    socket.on("connect", () => { 
      console.log("New User Connected");
      console.log("React User Id : ", socket.id);
      socket.on("message",(message)=>{
        console.log(message, socket.id);
      })
    })

    // socket.disconnect()

  },[])


  return (
    <div>App</div>
  )
}

export default App



// import { useEffect } from "react";
// import { io } from "socket.io-client";

// function App() {

//   useEffect(() => {
//     const socket = io("http://localhost:3000", {
//       withCredentials: true
//     });

//     socket.on("connect", () => {
//       console.log("Connected:", socket.id);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return <div>React + Socket.IO</div>;
// }

// export default App;
