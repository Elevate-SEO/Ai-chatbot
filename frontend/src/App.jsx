import { useState } from 'react'
import './App.css'

function App() {
    const [message,setMessage]=useState(" ");
    const [chats,ischats]=useState([]);
    const [isTyping,setIsTyping]=useState(false);


    const chat=async (e,message)=>{ 
       e.preventDefault();

       if(!message){ return setIsTyping(true)}

       let msg=chats;
       msg.push({role:"user",content:message})
       setMessage(msg);

     setMessage("")


       fetch("http://localhost:5173/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chats,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          msg.push(data.output);
          ischats(msg);
          setIsTyping(false);
          scrollTo(0, 1e10);
        })
        .catch((error) => {
          console.log(error);
        });

    }

    return (
      <main>
        <h1>FullStack Chat AI Tutorial</h1>
  
        <section>
          {chats && chats.length
            ? chats.map((chat, index) => (
                <p key={index} className={chat.role === "user" ? "user_msg" : ""}>
                  <span>
                    <b>{chat.role.toUpperCase()}</b>
                  </span>
                  <span>:</span>
                  <span>{chat.content}</span>
                </p>
              ))
            : ""}
        </section>
  
        <div className={isTyping ? "" : "hide"}>
          <p>
            <i>{isTyping ? "Typing" : ""}</i>
          </p>
        </div>
  
        <form action="" onSubmit={(e) => chat(e, message)}>
          <input
            type="text"
            name="message"
            value={message}
            placeholder="Type a message here and hit Enter..."
            onChange={(e) => setMessage(e.target.value)}
          />
        </form>
      </main>
    );
}

export default App
