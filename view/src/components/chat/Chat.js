import React, { useEffect, useState } from 'react'
import queryString from 'query-string';
import io from 'socket.io-client'
import './chat.css';
import InfoBar from '../infoBar/InfoBar';
import Input from './input/Input';
import Messages from './messages/Messages';
let socket;
function Chat({ location }) {
    let EndPoint = 'localhost:5000'

    const [messages, setMessages] = useState([])
    const [content, SetContent] = useState('');
    const [token ,setToken ] =useState(queryString.parse(location.search))
    const [current ,setCurrent] = useState('');
     
    useEffect(() => {
        socket = io(EndPoint)
        socket.emit('join', { token }, () => {
        });
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [EndPoint, location.search]);

    useEffect(() => { socket.on('message', message => setMessages([...messages, message])) }, [messages])
    useEffect(() => {socket.on('current', (user)=>setCurrent(user))}, [current])

    // Send message handler 
    const sendMessage = (event) => {
        event.preventDefault();
        if (content) {
            socket.emit("sentMessage", { content, token }, () => SetContent(''));
        }
    }
    const deleteMessage  =  (mes , event)=>{
        event.preventDefault();
        socket.emit("deleteMessage", mes.id , ()=>{
          let  msg =  messages.filter(message => message.content !== mes.content ) ;
          console.log("msg",msg);
          setMessages(msg);

        });
    }
    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar/>
                <Messages messages={messages} current={current} deleteMessage ={deleteMessage}/>
                <Input content={content} sendMessage={sendMessage} SetContent={SetContent}  />
            </div>
        </div>
    )
}

export default Chat
