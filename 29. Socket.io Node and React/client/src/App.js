import './App.css';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io.connect("http://192.168.5.73:8888")

function App() {
  const [message, setmessage] = useState("");
  const [receivedmessage, setreceivedmessage] = useState([]);
  const [roomid, setroomid] = useState(null);

  const sendmessage = () => {
    socket.emit("send_message", { message, room: roomid })
    sendnoti()
  }

  const joinroom = () => {
    socket.emit("joinroom", { room: roomid })
  }


  const sendnoti = () => {
    socket.emit("send_noti", { message})
  }

  useEffect(() => {
    socket.on("receivemessage", (data) => {
      console.log(data, "data")
      let b = receivedmessage.concat(data)
      setreceivedmessage(b)
    })

    console.log("🚀 ~ file: App.js ~ line 29 ~ socket.on ~ receivedmessage", receivedmessage)
    
    socket.on("receive", (data) => {
      if (Notification.permission === "granted") {
        console.log("1")
        new Notification(data.message);
      } else if (Notification.permission === "denied") {
        console.log("2")
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            const notification = new Notification(data.message);
          }
        });
      }
    })
  });





  return (
    <div className="App">
      <h1>Socket.IO</h1>
      <button onClick={() => joinroom()}>Join room</button>
      <input placeholder='Enter room number' onChange={(e) => { setroomid(e.target.value) }} />
      <br /><br />
      <button onClick={() => sendmessage()}>Send message</button>
      <input placeholder='Enter message' onChange={(e) => { setmessage(e.target.value) }} />
      <br /><br />
      <button onClick={() => sendnoti()}>Send Notification</button>
      <h1>Messages</h1>
      {receivedmessage.map((val) => {
        return (<>
          <h4>{val.message}</h4>
        </>)
      })}
    </div>
  );
}

export default App;
